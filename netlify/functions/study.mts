import { getUser } from '@netlify/identity'
import { getDatabase } from '@netlify/database'
import { eq, desc } from 'drizzle-orm'
import { database } from '../../db/index'
import { scholars, papers } from '../../db/schema'
import { z } from 'zod'
export default async (req: Request) => {
  const headers = { 'Cache-Control': 'private, no-store' }
  const reply = (data: unknown, status = 200) =>
    Response.json(data, { status, headers })
  try {
    const user = await getUser()
    if (!user)
      return reply({ error: 'Please sign in to access your workspace.' }, 401)
    if (!['GET', 'POST'].includes(req.method))
      return reply({ error: 'Method not allowed' }, 405)
    if (
      req.method === 'POST' &&
      req.headers.get('origin') !== new URL(req.url).origin
    )
      return reply({ error: 'Invalid request origin' }, 403)
    const db = database()
    const today = new Date().toISOString().slice(0, 10)
    await db.insert(scholars).values({ id: user.id }).onConflictDoNothing()
    if (req.method === 'GET') {
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .slice(0, 10)
      const raw = getDatabase()
      await raw.sql`UPDATE scholars SET coins=coins+10, streak=CASE WHEN last_login=${yesterday} THEN streak+1 ELSE 1 END, last_login=${today} WHERE id=${user.id} AND last_login<>${today}`
      const [profile] = await db
        .select()
        .from(scholars)
        .where(eq(scholars.id, user.id))
      const rows = await db
        .select()
        .from(papers)
        .where(eq(papers.userId, user.id))
        .orderBy(desc(papers.createdAt))
      return reply({
        profile,
        boundaries: profile.boundaries,
        entries: rows.map((r) => ({
          ...(r.data as Record<string, unknown>),
          id: r.id,
        })),
      })
    }
    const entrySchema = z
      .object({
        subject: z.string().min(1).max(100),
        board: z.string().min(1).max(100),
        level: z.string().min(1).max(80),
        year: z.string().regex(/^20\d\d$/),
        series: z.string().min(1).max(50),
        paper: z.string().min(1).max(100),
        marks: z.number().int().min(0).max(10000),
        total: z.number().int().min(1).max(10000),
        minutes: z.number().int().min(0).max(10000),
        allowed: z.number().int().min(1).max(10000),
        topics: z.string().max(1000),
        notes: z.string().max(5000),
      })
      .refine((e) => e.marks <= e.total, 'Marks cannot exceed total')

    const body = await req.json()
    if (body.action === 'entry') {
      const parsed = entrySchema.safeParse(body.entry)
      if (!parsed.success)
        return reply({ error: 'Check your paper details and marks.' }, 400)
      const data = { ...parsed.data, date: today }
      const pool = getDatabase().pool
      const client = await pool.connect()
      try {
        await client.query('BEGIN')
        await client.query(
          'INSERT INTO papers (id,user_id,data) VALUES ($1,$2,$3)',
          [crypto.randomUUID(), user.id, JSON.stringify(data)],
        )
        await client.query(
          'UPDATE scholars SET coins=coins+20,xp=xp+50 WHERE id=$1',
          [user.id],
        )
        await client.query('COMMIT')
      } catch (e) {
        await client.query('ROLLBACK')
        throw e
      } finally {
        client.release()
      }
      return reply({ ok: true })
    }
    if (body.action === 'boundaries') {
      const result = z
        .array(z.number().int().min(0).max(100))
        .length(6)
        .refine((a) => a.every((n, i) => i === 0 || n < a[i - 1]))
        .safeParse(body.boundaries)
      if (!result.success)
        return reply(
          { error: 'Grade thresholds must descend from A* to E.' },
          400,
        )
      await db
        .update(scholars)
        .set({ boundaries: result.data })
        .where(eq(scholars.id, user.id))
      return reply({ ok: true })
    }
    if (body.action === 'pet') {
      const costs: Record<string, number> = { owl: 0, fox: 150, cat: 250 }
      if (!Object.hasOwn(costs, body.pet))
        return reply({ error: 'Unknown companion' }, 400)
      const client = await getDatabase().pool.connect()
      try {
        await client.query('BEGIN')
        const result = await client.query(
          'SELECT coins,pets FROM scholars WHERE id=$1 FOR UPDATE',
          [user.id],
        )
        const p = result.rows[0]
        const owned = p.pets.includes(body.pet)
        const price = owned ? 0 : costs[body.pet]
        if (p.coins < price) {
          await client.query('ROLLBACK')
          return reply(
            { error: 'Keep studying! You need more coins for this companion.' },
            400,
          )
        }
        await client.query(
          'UPDATE scholars SET coins=coins-$1,pets=$2,equipped=$3 WHERE id=$4',
          [
            price,
            JSON.stringify(owned ? p.pets : [...p.pets, body.pet]),
            body.pet,
            user.id,
          ],
        )
        await client.query('COMMIT')
      } catch (e) {
        await client.query('ROLLBACK')
        throw e
      } finally {
        client.release()
      }
      return reply({ ok: true })
    }
    return reply({ error: 'Unknown action' }, 400)
  } catch {
    return reply(
      { error: 'Unable to sync your workspace right now. Please try again.' },
      500,
    )
  }
}
export const config = { path: '/api/study' }

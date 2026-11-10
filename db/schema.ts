import { pgTable, text, integer, jsonb, timestamp } from 'drizzle-orm/pg-core'
export const scholars = pgTable('scholars', {
  id: text('id').primaryKey(),
  coins: integer('coins').notNull().default(0),
  xp: integer('xp').notNull().default(0),
  streak: integer('streak').notNull().default(0),
  lastLogin: text('last_login').notNull().default(''),
  pets: jsonb('pets').$type<string[]>().notNull().default(['owl']),
  equipped: text('equipped').notNull().default('owl'),
  boundaries: jsonb('boundaries')
    .$type<number[]>()
    .notNull()
    .default([90, 80, 70, 60, 50, 40]),
})
export const papers = pgTable('papers', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => scholars.id),
  data: jsonb('data').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

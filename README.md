# Papertrail

A dark academic workspace for tracking past papers, reflecting on weak topics, and building a rewarding study habit.

Built with React, TypeScript, TanStack Start, Tailwind CSS, Netlify Identity, and Netlify Database (Postgres with Drizzle). The public sample workspace is clearly labelled; actual study logs, coins, XP, and companions require authentication and are scoped to the verified account.

## Local development

Install Node 22.13+ and pnpm, run `pnpm install`, then `netlify dev --port 8889`. Authentication requires a deployed Netlify Identity endpoint; use a deployed preview to exercise sign-in. Database provisioning and generated migrations are handled by Netlify during deploy.

Google OAuth is shown when the site's Identity settings report that Google is enabled. Configure that external provider in the site's Identity registration settings. Email signup/login is also available. Confirmation links are handled on the landing page.

## Features

- Paper history with subject/component filters, search, reflections, weak topics, and CSV export.
- Marks, percentage and configurable grade thresholds; timing comparisons.
- Repository searches for question papers, mark schemes, and examiner reports across 29 subjects, six boards, five qualifications, and years 2000–2026. These are discovery links rather than a hosted or verified complete paper archive; availability depends on the source and syllabus.
- Performance charts and subject/topic analysis.
- Consecutive UTC daily sign-in streaks, a seven-day paper goal, 10 daily coins, 50 XP and 20 coins per log, and three equipable study companions. Purchases and rewards are atomic in Postgres.

Schema: `db/schema.ts`. Generate new migrations with `pnpm exec drizzle-kit generate --name descriptive_change`. Never edit previously applied migrations. The private API is `netlify/functions/study.mts` at `/api/study`.

Study grade thresholds are estimates; official grades depend on the examination's published boundaries.

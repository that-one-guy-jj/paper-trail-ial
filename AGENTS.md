# Papertrail architecture

Papertrail is a React 19 / TypeScript single-page study tracker in TanStack Start. Netlify hosts the application and API; Tailwind 4 plus custom CSS define its dark lavender academic design.

## Key directories

- `src/routes/index.tsx`: dashboard, clearly labelled anonymous sample workspace, auth dialog, paper library, logs, analytics, streaks, shop, and settings.
- `src/routes/__root.tsx`: document shell, finished product metadata, shared providers.
- `src/styles.css`: responsive visual system; DM Sans and Manrope, charcoal surfaces, lavender accents, warm streak colors.
- `src/components/ui`: existing accessible Radix controls; dialogs use this library.
- `db/schema.ts`: account reward state and paper records. `db/index.ts` creates the Drizzle Netlify adapter.
- `netlify/functions/study.mts`: verified Identity account API at `/api/study`.
- `netlify/database/migrations`: generated Drizzle migrations, applied automatically at deployment.

## Conventions and decisions

Use Netlify Database for persistent state. No browser storage or local file persistence. Always scope records to the server-verified Identity user; never accept a user ID from request JSON. API responses must remain private and uncached. Browser identity uses normalized `name` and `pictureUrl` fields. Enabled OAuth providers come from `getSettings().providers`. Identity enablement is registered through the feature marker.

Anonymous visitors see demonstration records and rewards explicitly marked as sample data. Saving and purchases open the authentication dialog. Clear sample records immediately when a real account is loaded; never seed real accounts with demonstration records. Database errors must not cause sample data to appear as genuine records.

Coin balance updates and entry rewards use transactions. Pet purchases lock the scholar row before checking balance and ownership. Daily sign-in rewards use an atomic date comparison and UTC dates, including streak reset after gaps. Companion art is repo-native SVG. Chart values derive from actual logs. Grade thresholds are user preferences, not official grade predictions.

The paper library builds targeted source searches, not fabricated PDF URLs. Do not claim complete coverage: resources vary by board, year, qualification, and subject. CSV export includes all history and neutralizes formula-like cell values.

Generate a named migration for schema changes using the installed beta Drizzle tooling. Use snake_case database column names, typed client records, accessible labelled controls, keyboard focus styles, and responsive layouts. Keep all session credentials out of logs and source. Build validation runs in the platform pipeline; do not create build artifacts manually during automated changes.

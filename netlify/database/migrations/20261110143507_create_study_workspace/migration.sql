CREATE TABLE "papers" (
	"id" text PRIMARY KEY,
	"user_id" text NOT NULL,
	"data" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scholars" (
	"id" text PRIMARY KEY,
	"coins" integer DEFAULT 0 NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"streak" integer DEFAULT 0 NOT NULL,
	"last_login" text DEFAULT '' NOT NULL,
	"pets" jsonb DEFAULT '["owl"]' NOT NULL,
	"equipped" text DEFAULT 'owl' NOT NULL,
	"boundaries" jsonb DEFAULT '[90,80,70,60,50,40]' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "papers" ADD CONSTRAINT "papers_user_id_scholars_id_fkey" FOREIGN KEY ("user_id") REFERENCES "scholars"("id");
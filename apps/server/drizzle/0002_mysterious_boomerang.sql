ALTER TABLE "profiles" RENAME COLUMN "name" TO "display_name";--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "theme_mode" text DEFAULT 'dark';
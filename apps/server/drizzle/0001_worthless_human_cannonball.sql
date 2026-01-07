ALTER TABLE "notes" ADD COLUMN "number_of_edits" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "edited" boolean DEFAULT false;
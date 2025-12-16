CREATE TABLE "notes" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"user_id" varchar(24),
	"title" text NOT NULL,
	"content" text NOT NULL,
	"color" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"avatar_url" text
);
--> statement-breakpoint
CREATE TABLE "auth.users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar
);
--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_auth.users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."auth.users"("id") ON DELETE no action ON UPDATE no action;
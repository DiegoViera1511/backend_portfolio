CREATE TABLE IF NOT EXISTS "users" (
	"name" text PRIMARY KEY NOT NULL,
	"password" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "userTable" CASCADE;
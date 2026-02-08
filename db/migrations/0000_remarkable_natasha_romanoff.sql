CREATE TYPE "public"."category" AS ENUM('food', 'transportation', 'entertainment', 'utilities', 'shopping', 'health', 'subscriptions', 'travel', 'gifts', 'education');--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"amount" numeric(8, 2) NOT NULL,
	"date" timestamp NOT NULL,
	"category" "category" NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "expenses_category_idx" ON "expenses" USING btree ("category");--> statement-breakpoint
CREATE INDEX "expenses_date_idx" ON "expenses" USING btree ("date");
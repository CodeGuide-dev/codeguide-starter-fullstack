CREATE TYPE "public"."asset_type" AS ENUM('real_estate', 'vehicle', 'cash', 'savings', 'other');--> statement-breakpoint
CREATE TYPE "public"."expense_category" AS ENUM('housing', 'transportation', 'food', 'utilities', 'insurance', 'healthcare', 'entertainment', 'education', 'clothing', 'personal_care', 'debt_payments', 'taxes', 'savings', 'other');--> statement-breakpoint
CREATE TYPE "public"."income_type" AS ENUM('salary', 'freelance', 'business', 'investments', 'rental', 'pension', 'benefits', 'other');--> statement-breakpoint
CREATE TYPE "public"."investment_type" AS ENUM('stocks', 'bonds', 'crypto', 'mutual_funds', 'etf', 'commodities', 'other');--> statement-breakpoint
CREATE TABLE "assets" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"type" "asset_type" NOT NULL,
	"value" numeric(12, 2) NOT NULL,
	"description" text,
	"purchase_date" timestamp,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"category" "expense_category" NOT NULL,
	"description" text,
	"date" timestamp NOT NULL,
	"is_recurring" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "income" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"type" "income_type" NOT NULL,
	"description" text,
	"date" timestamp NOT NULL,
	"is_recurring" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "investments" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"type" "investment_type" NOT NULL,
	"symbol" text,
	"quantity" numeric(12, 4) NOT NULL,
	"purchase_price" numeric(12, 2) NOT NULL,
	"current_price" numeric(12, 2),
	"description" text,
	"purchase_date" timestamp NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "income" ADD CONSTRAINT "income_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "investments" ADD CONSTRAINT "investments_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
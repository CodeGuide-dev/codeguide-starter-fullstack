-- Create finance-related enum types
CREATE TYPE "public"."asset_type" AS ENUM('real_estate', 'vehicle', 'cash', 'savings', 'other');
CREATE TYPE "public"."investment_type" AS ENUM('stocks', 'bonds', 'crypto', 'mutual_funds', 'etf', 'commodities', 'other');
CREATE TYPE "public"."expense_category" AS ENUM('housing', 'transportation', 'food', 'utilities', 'insurance', 'healthcare', 'entertainment', 'education', 'clothing', 'personal_care', 'debt_payments', 'taxes', 'savings', 'other');
CREATE TYPE "public"."income_type" AS ENUM('salary', 'freelance', 'business', 'investments', 'rental', 'pension', 'benefits', 'other');

-- Create assets table
CREATE TABLE "assets" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"type" "asset_type" NOT NULL,
	"value" numeric(12,2) NOT NULL,
	"description" text,
	"purchase_date" timestamp,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "assets_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade
);

-- Create investments table
CREATE TABLE "investments" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"type" "investment_type" NOT NULL,
	"symbol" text,
	"quantity" numeric(12,4) NOT NULL,
	"purchase_price" numeric(12,2) NOT NULL,
	"current_price" numeric(12,2),
	"description" text,
	"purchase_date" timestamp NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "investments_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade
);

-- Create expenses table
CREATE TABLE "expenses" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"amount" numeric(12,2) NOT NULL,
	"category" "expense_category" NOT NULL,
	"description" text,
	"date" timestamp NOT NULL,
	"is_recurring" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "expenses_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade
);

-- Create income table
CREATE TABLE "income" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"amount" numeric(12,2) NOT NULL,
	"type" "income_type" NOT NULL,
	"description" text,
	"date" timestamp NOT NULL,
	"is_recurring" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "income_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade
);

-- Create indexes for better performance
CREATE INDEX "assets_user_id_idx" ON "assets" ("user_id");
CREATE INDEX "investments_user_id_idx" ON "investments" ("user_id");
CREATE INDEX "expenses_user_id_idx" ON "expenses" ("user_id");
CREATE INDEX "income_user_id_idx" ON "income" ("user_id");
CREATE INDEX "expenses_date_idx" ON "expenses" ("date");
CREATE INDEX "income_date_idx" ON "income" ("date");
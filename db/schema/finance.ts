import { pgTable, text, numeric, timestamp, integer, boolean, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth";

// Enums for different finance types
export const assetTypeEnum = pgEnum("asset_type", [
  "cash",
  "real_estate", 
  "vehicle",
  "jewelry",
  "electronics",
  "other"
]);

export const investmentTypeEnum = pgEnum("investment_type", [
  "stocks",
  "bonds",
  "mutual_funds",
  "crypto",
  "real_estate",
  "retirement",
  "other"
]);

export const expenseCategoryEnum = pgEnum("expense_category", [
  "housing",
  "food",
  "transportation",
  "utilities",
  "healthcare",
  "entertainment",
  "education",
  "clothing",
  "personal_care",
  "debt",
  "savings",
  "gifts",
  "other"
]);

export const incomeFrequencyEnum = pgEnum("income_frequency", [
  "weekly",
  "biweekly",
  "monthly",
  "quarterly",
  "yearly",
  "one_time"
]);

// Assets table
export const assets = pgTable("assets", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: assetTypeEnum("type").notNull(),
  value: numeric("value", { precision: 15, scale: 2 }).notNull(),
  purchaseDate: timestamp("purchase_date"),
  description: text("description"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

// Investments table
export const investments = pgTable("investments", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: investmentTypeEnum("type").notNull(),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  currentValue: numeric("current_value", { precision: 15, scale: 2 }).notNull(),
  purchaseDate: timestamp("purchase_date").notNull(),
  tickerSymbol: text("ticker_symbol"),
  description: text("description"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

// Expenses table
export const expenses = pgTable("expenses", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  category: expenseCategoryEnum("category").notNull(),
  date: timestamp("date").notNull(),
  isRecurring: boolean("is_recurring").default(false).notNull(),
  recurringFrequency: text("recurring_frequency"),
  notes: text("notes"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

// Income table
export const income = pgTable("income", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  source: text("source").notNull(),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  frequency: incomeFrequencyEnum("frequency").notNull(),
  date: timestamp("date").notNull(),
  isRecurring: boolean("is_recurring").default(true).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

// Export all finance tables
export const financeSchema = {
  assets,
  investments,
  expenses,
  income,
  assetTypeEnum,
  investmentTypeEnum,
  expenseCategoryEnum,
  incomeFrequencyEnum,
};
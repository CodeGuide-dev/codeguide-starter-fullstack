import { pgTable, text, timestamp, numeric, integer, boolean, uuid, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const assetTypeEnum = pgEnum("asset_type", [
  "real_estate",
  "vehicle", 
  "savings",
  "checking",
  "retirement",
  "other"
]);

export const investmentTypeEnum = pgEnum("investment_type", [
  "stock",
  "bond",
  "mutual_fund",
  "etf",
  "crypto",
  "real_estate",
  "other"
]);

export const expenseCategoryEnum = pgEnum("expense_category", [
  "housing",
  "utilities",
  "food",
  "transportation",
  "healthcare",
  "entertainment",
  "education",
  "shopping",
  "travel",
  "other"
]);

export const incomeTypeEnum = pgEnum("income_type", [
  "salary",
  "freelance",
  "investment",
  "rental",
  "business",
  "pension",
  "social_security",
  "other"
]);

export const assets = pgTable("assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: assetTypeEnum("type").notNull(),
  value: numeric("value", { precision: 15, scale: 2 }).notNull(),
  description: text("description"),
  acquiredDate: timestamp("acquired_date"),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export const investments = pgTable("investments", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: investmentTypeEnum("type").notNull(),
  symbol: text("symbol"),
  quantity: numeric("quantity", { precision: 15, scale: 6 }).notNull(),
  purchasePrice: numeric("purchase_price", { precision: 15, scale: 2 }).notNull(),
  currentPrice: numeric("current_price", { precision: 15, scale: 2 }),
  purchaseDate: timestamp("purchase_date").notNull(),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export const expenses = pgTable("expenses", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  category: expenseCategoryEnum("category").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  recurring: boolean("recurring").default(false).notNull(),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export const income = pgTable("income", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  type: incomeTypeEnum("type").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  recurring: boolean("recurring").default(false).notNull(),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export const netWorthHistory = pgTable("net_worth_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  totalAssets: numeric("total_assets", { precision: 15, scale: 2 }).notNull(),
  totalLiabilities: numeric("total_liabilities", { precision: 15, scale: 2 }).notNull(),
  netWorth: numeric("net_worth", { precision: 15, scale: 2 }).notNull(),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});
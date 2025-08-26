import { pgTable, text, timestamp, decimal, integer, varchar, date, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth";

// Assets table
export const assets = pgTable("assets", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: text("type", { enum: ["cash", "real_estate", "vehicle", "other"] }).notNull(),
  value: decimal("value", { precision: 12, scale: 2 }).notNull(),
  description: text("description"),
  purchaseDate: date("purchase_date"),
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
  type: text("type", { enum: ["stocks", "bonds", "crypto", "mutual_funds", "etf", "other"] }).notNull(),
  symbol: varchar("symbol", { length: 10 }),
  quantity: decimal("quantity", { precision: 15, scale: 6 }),
  purchasePrice: decimal("purchase_price", { precision: 12, scale: 2 }),
  currentPrice: decimal("current_price", { precision: 12, scale: 2 }),
  totalValue: decimal("total_value", { precision: 12, scale: 2 }),
  purchaseDate: date("purchase_date"),
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
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  category: text("category", { 
    enum: ["food", "transport", "housing", "utilities", "entertainment", "healthcare", "education", "shopping", "other"]
  }).notNull(),
  description: text("description"),
  date: date("date").notNull(),
  paymentMethod: text("payment_method", { enum: ["cash", "credit_card", "debit_card", "bank_transfer", "other"] }),
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
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  source: text("source", { 
    enum: ["salary", "freelance", "investment", "business", "gift", "other"]
  }).notNull(),
  description: text("description"),
  date: date("date").notNull(),
  recurring: boolean("recurring").default(false),
  frequency: text("frequency", { enum: ["weekly", "monthly", "yearly"] }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

// Relations
export const assetsRelations = relations(assets, ({ one }) => ({
  user: one(user, {
    fields: [assets.userId],
    references: [user.id],
  }),
}));

export const investmentsRelations = relations(investments, ({ one }) => ({
  user: one(user, {
    fields: [investments.userId],
    references: [user.id],
  }),
}));

export const expensesRelations = relations(expenses, ({ one }) => ({
  user: one(user, {
    fields: [expenses.userId],
    references: [user.id],
  }),
}));

export const incomeRelations = relations(income, ({ one }) => ({
  user: one(user, {
    fields: [income.userId],
    references: [user.id],
  }),
}));
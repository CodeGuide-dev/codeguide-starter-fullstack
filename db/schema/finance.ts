import { pgTable, text, timestamp, integer, numeric, primaryKey, foreignKey } from "drizzle-orm/pg-core";
import { user } from "./auth";

// Assets table - for tracking user assets like property, vehicles, etc.
export const asset = pgTable("asset", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    value: numeric("value", { precision: 12, scale: 2 }).notNull(), // Store as decimal for currency
    currency: text("currency").default("USD"),
    purchaseDate: timestamp("purchase_date"),
    category: text("category"), // e.g., "Real Estate", "Vehicle", "Jewelry"
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
});

// Investments table - for tracking stocks, bonds, mutual funds, etc.
export const investment = pgTable("investment", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    type: text("type"), // e.g., "Stock", "Bond", "Mutual Fund", "Crypto"
    quantity: numeric("quantity", { precision: 12, scale: 4 }).notNull(),
    purchasePrice: numeric("purchase_price", { precision: 12, scale: 4 }).notNull(),
    currentValue: numeric("current_value", { precision: 12, scale: 2 }),
    purchaseDate: timestamp("purchase_date").notNull(),
    currentPrice: numeric("current_price", { precision: 12, scale: 4 }),
    currency: text("currency").default("USD"),
    category: text("category"), // e.g., "Equity", "Fixed Income", "Alternative"
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
});

// Expenses table - for tracking user expenses
export const expense = pgTable("expense", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    currency: text("currency").default("USD"),
    date: timestamp("date").notNull(),
    category: text("category"), // e.g., "Food", "Transportation", "Entertainment"
    paymentMethod: text("payment_method"), // e.g., "Credit Card", "Cash", "Debit Card"
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
});

// Income table - for tracking user income sources
export const income = pgTable("income", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    currency: text("currency").default("USD"),
    date: timestamp("date").notNull(),
    category: text("category"), // e.g., "Salary", "Freelance", "Investment"
    frequency: text("frequency"), // e.g., "One-time", "Weekly", "Monthly", "Yearly"
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
});
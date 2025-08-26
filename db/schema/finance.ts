import { pgTable, text, timestamp, decimal, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const assetTypeEnum = pgEnum("asset_type", [
    "real_estate",
    "vehicle",
    "cash",
    "savings",
    "other"
]);

export const investmentTypeEnum = pgEnum("investment_type", [
    "stocks",
    "bonds",
    "crypto",
    "mutual_funds",
    "etf",
    "commodities",
    "other"
]);

export const expenseCategoryEnum = pgEnum("expense_category", [
    "housing",
    "transportation",
    "food",
    "utilities",
    "insurance",
    "healthcare",
    "entertainment",
    "education",
    "clothing",
    "personal_care",
    "debt_payments",
    "taxes",
    "savings",
    "other"
]);

export const incomeTypeEnum = pgEnum("income_type", [
    "salary",
    "freelance",
    "business",
    "investments",
    "rental",
    "pension",
    "benefits",
    "other"
]);

export const assets = pgTable("assets", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    type: assetTypeEnum("type").notNull(),
    value: decimal("value", { precision: 12, scale: 2 }).notNull(),
    description: text("description"),
    purchaseDate: timestamp("purchase_date"),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull()
        .$onUpdate(() => new Date()),
});

export const investments = pgTable("investments", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    type: investmentTypeEnum("type").notNull(),
    symbol: text("symbol"),
    quantity: decimal("quantity", { precision: 12, scale: 4 }).notNull(),
    purchasePrice: decimal("purchase_price", { precision: 12, scale: 2 }).notNull(),
    currentPrice: decimal("current_price", { precision: 12, scale: 2 }),
    description: text("description"),
    purchaseDate: timestamp("purchase_date").notNull(),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull()
        .$onUpdate(() => new Date()),
});

export const expenses = pgTable("expenses", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
    category: expenseCategoryEnum("category").notNull(),
    description: text("description"),
    date: timestamp("date").notNull(),
    isRecurring: text("is_recurring").$type<"monthly" | "weekly" | "yearly" | null>(),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull()
        .$onUpdate(() => new Date()),
});

export const income = pgTable("income", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
    type: incomeTypeEnum("type").notNull(),
    description: text("description"),
    date: timestamp("date").notNull(),
    isRecurring: text("is_recurring").$type<"monthly" | "weekly" | "yearly" | null>(),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull()
        .$onUpdate(() => new Date()),
});
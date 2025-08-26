import { db } from '../../db';
import { asset, investment, expense, income } from '../../db/schema/finance';
import { eq, and } from 'drizzle-orm';
import { Asset, Investment, Expense, Income } from '../types/finance';

// Asset operations
export async function createAsset(data: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>) {
  const [result] = await db.insert(asset).values({
    ...data,
    id: crypto.randomUUID(),
  }).returning();
  return result;
}

export async function getAssetsByUserId(userId: string) {
  return await db.select().from(asset).where(eq(asset.userId, userId));
}

export async function getAssetById(id: string, userId: string) {
  const [result] = await db.select().from(asset)
    .where(and(eq(asset.id, id), eq(asset.userId, userId)));
  return result;
}

export async function updateAsset(id: string, userId: string, data: Partial<Asset>) {
  const [result] = await db.update(asset)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(asset.id, id), eq(asset.userId, userId)))
    .returning();
  return result;
}

export async function deleteAsset(id: string, userId: string) {
  const [result] = await db.delete(asset)
    .where(and(eq(asset.id, id), eq(asset.userId, userId)))
    .returning();
  return result;
}

// Investment operations
export async function createInvestment(data: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>) {
  const [result] = await db.insert(investment).values({
    ...data,
    id: crypto.randomUUID(),
  }).returning();
  return result;
}

export async function getInvestmentsByUserId(userId: string) {
  return await db.select().from(investment).where(eq(investment.userId, userId));
}

export async function getInvestmentById(id: string, userId: string) {
  const [result] = await db.select().from(investment)
    .where(and(eq(investment.id, id), eq(investment.userId, userId)));
  return result;
}

export async function updateInvestment(id: string, userId: string, data: Partial<Investment>) {
  const [result] = await db.update(investment)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(investment.id, id), eq(investment.userId, userId)))
    .returning();
  return result;
}

export async function deleteInvestment(id: string, userId: string) {
  const [result] = await db.delete(investment)
    .where(and(eq(investment.id, id), eq(investment.userId, userId)))
    .returning();
  return result;
}

// Expense operations
export async function createExpense(data: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) {
  const [result] = await db.insert(expense).values({
    ...data,
    id: crypto.randomUUID(),
  }).returning();
  return result;
}

export async function getExpensesByUserId(userId: string) {
  return await db.select().from(expense).where(eq(expense.userId, userId));
}

export async function getExpenseById(id: string, userId: string) {
  const [result] = await db.select().from(expense)
    .where(and(eq(expense.id, id), eq(expense.userId, userId)));
  return result;
}

export async function updateExpense(id: string, userId: string, data: Partial<Expense>) {
  const [result] = await db.update(expense)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(expense.id, id), eq(expense.userId, userId)))
    .returning();
  return result;
}

export async function deleteExpense(id: string, userId: string) {
  const [result] = await db.delete(expense)
    .where(and(eq(expense.id, id), eq(expense.userId, userId)))
    .returning();
  return result;
}

// Income operations
export async function createIncome(data: Omit<Income, 'id' | 'createdAt' | 'updatedAt'>) {
  const [result] = await db.insert(income).values({
    ...data,
    id: crypto.randomUUID(),
  }).returning();
  return result;
}

export async function getIncomesByUserId(userId: string) {
  return await db.select().from(income).where(eq(income.userId, userId));
}

export async function getIncomeById(id: string, userId: string) {
  const [result] = await db.select().from(income)
    .where(and(eq(income.id, id), eq(income.userId, userId)));
  return result;
}

export async function updateIncome(id: string, userId: string, data: Partial<Income>) {
  const [result] = await db.update(income)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(income.id, id), eq(income.userId, userId)))
    .returning();
  return result;
}

export async function deleteIncome(id: string, userId: string) {
  const [result] = await db.delete(income)
    .where(and(eq(income.id, id), eq(income.userId, userId)))
    .returning();
  return result;
}
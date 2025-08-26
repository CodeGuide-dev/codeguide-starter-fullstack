import { NextRequest } from 'next/server';
import { db } from '@/db';
import { assets, investments, expenses, income } from '@/db/schema/finance';
import { eq, and, gte, lte, sum, sql } from 'drizzle-orm';
import { getAuthenticatedUser, createResponse, createErrorResponse } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Get total assets
    const [totalAssetsResult] = await db
      .select({ total: sum(assets.value) })
      .from(assets)
      .where(eq(assets.userId, user.id));

    const totalAssets = parseFloat(totalAssetsResult?.total ?? '0');

    // Get total investments value (current price * quantity)
    const [totalInvestmentsResult] = await db
      .select({ total: sql`SUM(${investments.currentPrice} * ${investments.quantity})` })
      .from(investments)
      .where(eq(investments.userId, user.id));

    const totalInvestments = parseFloat(totalInvestmentsResult?.total ?? '0');

    // Get total expenses for period
    let expensesQuery = db
      .select({ total: sum(expenses.amount) })
      .from(expenses)
      .where(eq(expenses.userId, user.id));

    if (startDate && endDate) {
      expensesQuery = expensesQuery.where(
        and(
          gte(expenses.date, new Date(startDate)),
          lte(expenses.date, new Date(endDate))
        )
      );
    }

    const [totalExpensesResult] = await expensesQuery;
    const totalExpenses = parseFloat(totalExpensesResult?.total ?? '0');

    // Get total income for period
    let incomeQuery = db
      .select({ total: sum(income.amount) })
      .from(income)
      .where(eq(income.userId, user.id));

    if (startDate && endDate) {
      incomeQuery = incomeQuery.where(
        and(
          gte(income.date, new Date(startDate)),
          lte(income.date, new Date(endDate))
        )
      );
    }

    const [totalIncomeResult] = await incomeQuery;
    const totalIncome = parseFloat(totalIncomeResult?.total ?? '0');

    // Calculate net worth
    const netWorth = totalAssets + totalInvestments;

    // Calculate cash flow
    const cashFlow = totalIncome - totalExpenses;

    const summary = {
      totalAssets,
      totalInvestments,
      totalExpenses,
      totalIncome,
      netWorth,
      cashFlow,
      period: {
        startDate: startDate || 'all time',
        endDate: endDate || 'all time'
      }
    };

    return createResponse(summary);
  } catch (error) {
    console.error('Error fetching financial summary:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
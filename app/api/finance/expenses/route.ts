import { NextRequest } from 'next/server';
import { db } from '@/db';
import { expenses } from '@/db/schema/finance';
import { eq, and, gte, lte } from 'drizzle-orm';
import { getAuthenticatedUser, createResponse, createErrorResponse, validateRequiredFields } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const category = searchParams.get('category');

    if (id) {
      const [expense] = await db
        .select()
        .from(expenses)
        .where(and(eq(expenses.id, id), eq(expenses.userId, user.id)));

      if (!expense) {
        return createErrorResponse('Expense not found', 404);
      }

      return createResponse(expense);
    }

    let query = db
      .select()
      .from(expenses)
      .where(eq(expenses.userId, user.id));

    if (startDate && endDate) {
      query = query.where(
        and(
          gte(expenses.date, new Date(startDate)),
          lte(expenses.date, new Date(endDate))
        )
      );
    }

    if (category) {
      query = query.where(eq(expenses.category, category));
    }

    const userExpenses = await query.orderBy(expenses.date);

    return createResponse(userExpenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    
    const validationError = validateRequiredFields(body, ['amount', 'category', 'description', 'date']);
    if (validationError) {
      return createErrorResponse(validationError, 400);
    }

    const [newExpense] = await db
      .insert(expenses)
      .values({
        userId: user.id,
        amount: body.amount,
        category: body.category,
        description: body.description,
        date: new Date(body.date),
        recurring: body.recurring ?? false,
      })
      .returning();

    return createResponse(newExpense, 201);
  } catch (error) {
    console.error('Error creating expense:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return createErrorResponse('Expense ID is required', 400);
    }

    const body = await request.json();

    const [existingExpense] = await db
      .select()
      .from(expenses)
      .where(and(eq(expenses.id, id), eq(expenses.userId, user.id)));

    if (!existingExpense) {
      return createErrorResponse('Expense not found', 404);
    }

    const [updatedExpense] = await db
      .update(expenses)
      .set({
        amount: body.amount ?? existingExpense.amount,
        category: body.category ?? existingExpense.category,
        description: body.description ?? existingExpense.description,
        date: body.date ? new Date(body.date) : existingExpense.date,
        recurring: body.recurring ?? existingExpense.recurring,
        updatedAt: new Date(),
      })
      .where(and(eq(expenses.id, id), eq(expenses.userId, user.id)))
      .returning();

    return createResponse(updatedExpense);
  } catch (error) {
    console.error('Error updating expense:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return createErrorResponse('Expense ID is required', 400);
    }

    const [existingExpense] = await db
      .select()
      .from(expenses)
      .where(and(eq(expenses.id, id), eq(expenses.userId, user.id)));

    if (!existingExpense) {
      return createErrorResponse('Expense not found', 404);
    }

    await db
      .delete(expenses)
      .where(and(eq(expenses.id, id), eq(expenses.userId, user.id)));

    return createResponse({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
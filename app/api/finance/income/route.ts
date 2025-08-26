import { NextRequest } from 'next/server';
import { db } from '@/db';
import { income } from '@/db/schema/finance';
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
    const type = searchParams.get('type');

    if (id) {
      const [incomeRecord] = await db
        .select()
        .from(income)
        .where(and(eq(income.id, id), eq(income.userId, user.id)));

      if (!incomeRecord) {
        return createErrorResponse('Income record not found', 404);
      }

      return createResponse(incomeRecord);
    }

    let query = db
      .select()
      .from(income)
      .where(eq(income.userId, user.id));

    if (startDate && endDate) {
      query = query.where(
        and(
          gte(income.date, new Date(startDate)),
          lte(income.date, new Date(endDate))
        )
      );
    }

    if (type) {
      query = query.where(eq(income.type, type));
    }

    const userIncome = await query.orderBy(income.date);

    return createResponse(userIncome);
  } catch (error) {
    console.error('Error fetching income:', error);
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
    
    const validationError = validateRequiredFields(body, ['amount', 'type', 'description', 'date']);
    if (validationError) {
      return createErrorResponse(validationError, 400);
    }

    const [newIncome] = await db
      .insert(income)
      .values({
        userId: user.id,
        amount: body.amount,
        type: body.type,
        description: body.description,
        date: new Date(body.date),
        recurring: body.recurring ?? false,
      })
      .returning();

    return createResponse(newIncome, 201);
  } catch (error) {
    console.error('Error creating income:', error);
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
      return createErrorResponse('Income ID is required', 400);
    }

    const body = await request.json();

    const [existingIncome] = await db
      .select()
      .from(income)
      .where(and(eq(income.id, id), eq(income.userId, user.id)));

    if (!existingIncome) {
      return createErrorResponse('Income record not found', 404);
    }

    const [updatedIncome] = await db
      .update(income)
      .set({
        amount: body.amount ?? existingIncome.amount,
        type: body.type ?? existingIncome.type,
        description: body.description ?? existingIncome.description,
        date: body.date ? new Date(body.date) : existingIncome.date,
        recurring: body.recurring ?? existingIncome.recurring,
        updatedAt: new Date(),
      })
      .where(and(eq(income.id, id), eq(income.userId, user.id)))
      .returning();

    return createResponse(updatedIncome);
  } catch (error) {
    console.error('Error updating income:', error);
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
      return createErrorResponse('Income ID is required', 400);
    }

    const [existingIncome] = await db
      .select()
      .from(income)
      .where(and(eq(income.id, id), eq(income.userId, user.id)));

    if (!existingIncome) {
      return createErrorResponse('Income record not found', 404);
    }

    await db
      .delete(income)
      .where(and(eq(income.id, id), eq(income.userId, user.id)));

    return createResponse({ message: 'Income record deleted successfully' });
  } catch (error) {
    console.error('Error deleting income:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
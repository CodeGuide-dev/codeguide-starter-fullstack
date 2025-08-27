import { NextRequest } from 'next/server';
import { db, finance } from '@/db';
import { getAuthenticatedUser, createErrorResponse, createSuccessResponse } from '@/lib/auth-utils';
import { updateExpenseSchema } from '@/lib/validations/finance';
import { eq, and } from 'drizzle-orm';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const user = await getAuthenticatedUser();
        if (!user) {
            return createErrorResponse('Unauthorized', 401);
        }

        const expense = await db
            .select()
            .from(finance.expenses)
            .where(and(
                eq(finance.expenses.id, id),
                eq(finance.expenses.userId, user.id)
            ))
            .limit(1);

        if (expense.length === 0) {
            return createErrorResponse('Expense not found', 404);
        }

        return createSuccessResponse(expense[0]);
    } catch (error) {
        console.error('Error fetching expense:', error);
        return createErrorResponse('Internal server error', 500);
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const user = await getAuthenticatedUser();
        if (!user) {
            return createErrorResponse('Unauthorized', 401);
        }

        const body = await request.json();
        const validationResult = updateExpenseSchema.safeParse(body);

        if (!validationResult.success) {
            return createErrorResponse(
                validationResult.error.issues.map(e => e.message).join(', '),
                400
            );
        }

        const updateData = { ...validationResult.data, updatedAt: new Date() };
        
        if (updateData.date) {
            updateData.date = new Date(updateData.date);
        }

        const updatedExpense = await db
            .update(finance.expenses)
            .set(updateData)
            .where(and(
                eq(finance.expenses.id, id),
                eq(finance.expenses.userId, user.id)
            ))
            .returning();

        if (updatedExpense.length === 0) {
            return createErrorResponse('Expense not found', 404);
        }

        return createSuccessResponse(updatedExpense[0]);
    } catch (error) {
        console.error('Error updating expense:', error);
        return createErrorResponse('Internal server error', 500);
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const user = await getAuthenticatedUser();
        if (!user) {
            return createErrorResponse('Unauthorized', 401);
        }

        const deletedExpense = await db
            .delete(finance.expenses)
            .where(and(
                eq(finance.expenses.id, id),
                eq(finance.expenses.userId, user.id)
            ))
            .returning();

        if (deletedExpense.length === 0) {
            return createErrorResponse('Expense not found', 404);
        }

        return createSuccessResponse({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        return createErrorResponse('Internal server error', 500);
    }
}
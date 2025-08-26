import { NextRequest } from 'next/server';
import { db, finance } from '@/db';
import { getAuthenticatedUser, createErrorResponse, createSuccessResponse } from '@/lib/auth-utils';
import { updateIncomeSchema } from '@/lib/validations/finance';
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

        const income = await db
            .select()
            .from(finance.income)
            .where(and(
                eq(finance.income.id, id),
                eq(finance.income.userId, user.id)
            ))
            .limit(1);

        if (income.length === 0) {
            return createErrorResponse('Income not found', 404);
        }

        return createSuccessResponse(income[0]);
    } catch (error) {
        console.error('Error fetching income:', error);
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
        const validationResult = updateIncomeSchema.safeParse(body);

        if (!validationResult.success) {
            return createErrorResponse(
                validationResult.error.errors.map(e => e.message).join(', '),
                400
            );
        }

        const updateData = { ...validationResult.data, updatedAt: new Date() };
        
        if (updateData.date) {
            updateData.date = new Date(updateData.date);
        }

        const updatedIncome = await db
            .update(finance.income)
            .set(updateData)
            .where(and(
                eq(finance.income.id, id),
                eq(finance.income.userId, user.id)
            ))
            .returning();

        if (updatedIncome.length === 0) {
            return createErrorResponse('Income not found', 404);
        }

        return createSuccessResponse(updatedIncome[0]);
    } catch (error) {
        console.error('Error updating income:', error);
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

        const deletedIncome = await db
            .delete(finance.income)
            .where(and(
                eq(finance.income.id, id),
                eq(finance.income.userId, user.id)
            ))
            .returning();

        if (deletedIncome.length === 0) {
            return createErrorResponse('Income not found', 404);
        }

        return createSuccessResponse({ message: 'Income deleted successfully' });
    } catch (error) {
        console.error('Error deleting income:', error);
        return createErrorResponse('Internal server error', 500);
    }
}
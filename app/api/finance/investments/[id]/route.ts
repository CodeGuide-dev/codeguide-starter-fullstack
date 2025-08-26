import { NextRequest } from 'next/server';
import { db, finance } from '@/db';
import { getAuthenticatedUser, createErrorResponse, createSuccessResponse } from '@/lib/auth-utils';
import { updateInvestmentSchema } from '@/lib/validations/finance';
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

        const investment = await db
            .select()
            .from(finance.investments)
            .where(and(
                eq(finance.investments.id, id),
                eq(finance.investments.userId, user.id)
            ))
            .limit(1);

        if (investment.length === 0) {
            return createErrorResponse('Investment not found', 404);
        }

        return createSuccessResponse(investment[0]);
    } catch (error) {
        console.error('Error fetching investment:', error);
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
        const validationResult = updateInvestmentSchema.safeParse(body);

        if (!validationResult.success) {
            return createErrorResponse(
                validationResult.error.issues.map(e => e.message).join(', '),
                400
            );
        }

        const updateData = { ...validationResult.data, updatedAt: new Date() };
        
        if (updateData.purchaseDate) {
            updateData.purchaseDate = new Date(updateData.purchaseDate);
        }

        const updatedInvestment = await db
            .update(finance.investments)
            .set(updateData)
            .where(and(
                eq(finance.investments.id, id),
                eq(finance.investments.userId, user.id)
            ))
            .returning();

        if (updatedInvestment.length === 0) {
            return createErrorResponse('Investment not found', 404);
        }

        return createSuccessResponse(updatedInvestment[0]);
    } catch (error) {
        console.error('Error updating investment:', error);
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

        const deletedInvestment = await db
            .delete(finance.investments)
            .where(and(
                eq(finance.investments.id, id),
                eq(finance.investments.userId, user.id)
            ))
            .returning();

        if (deletedInvestment.length === 0) {
            return createErrorResponse('Investment not found', 404);
        }

        return createSuccessResponse({ message: 'Investment deleted successfully' });
    } catch (error) {
        console.error('Error deleting investment:', error);
        return createErrorResponse('Internal server error', 500);
    }
}
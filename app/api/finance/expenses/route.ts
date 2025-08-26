import { NextRequest } from 'next/server';
import { db, finance } from '@/db';
import { getAuthenticatedUser, createErrorResponse, createSuccessResponse } from '@/lib/auth-utils';
import { createExpenseSchema } from '@/lib/validations/finance';
import { eq } from 'drizzle-orm';

export async function GET() {
    try {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createErrorResponse('Unauthorized', 401);
        }

        const expenses = await db
            .select()
            .from(finance.expenses)
            .where(eq(finance.expenses.userId, user.id));

        return createSuccessResponse(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        return createErrorResponse('Internal server error', 500);
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createErrorResponse('Unauthorized', 401);
        }

        const body = await request.json();
        const validationResult = createExpenseSchema.safeParse(body);

        if (!validationResult.success) {
            return createErrorResponse(
                validationResult.error.errors.map(e => e.message).join(', '),
                400
            );
        }

        const { title, amount, category, description, date, isRecurring } = validationResult.data;

        const newExpense = await db
            .insert(finance.expenses)
            .values({
                userId: user.id,
                title,
                amount,
                category,
                description,
                date: new Date(date),
                isRecurring: isRecurring || null,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();

        return createSuccessResponse(newExpense[0], 201);
    } catch (error) {
        console.error('Error creating expense:', error);
        return createErrorResponse('Internal server error', 500);
    }
}
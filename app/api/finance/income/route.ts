import { NextRequest } from 'next/server';
import { db, finance } from '@/db';
import { getAuthenticatedUser, createErrorResponse, createSuccessResponse } from '@/lib/auth-utils';
import { createIncomeSchema } from '@/lib/validations/finance';
import { eq } from 'drizzle-orm';

export async function GET() {
    try {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createErrorResponse('Unauthorized', 401);
        }

        const income = await db
            .select()
            .from(finance.income)
            .where(eq(finance.income.userId, user.id));

        return createSuccessResponse(income);
    } catch (error) {
        console.error('Error fetching income:', error);
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
        const validationResult = createIncomeSchema.safeParse(body);

        if (!validationResult.success) {
            return createErrorResponse(
                validationResult.error.errors.map(e => e.message).join(', '),
                400
            );
        }

        const { title, amount, type, description, date, isRecurring } = validationResult.data;

        const newIncome = await db
            .insert(finance.income)
            .values({
                userId: user.id,
                title,
                amount,
                type,
                description,
                date: new Date(date),
                isRecurring: isRecurring || null,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();

        return createSuccessResponse(newIncome[0], 201);
    } catch (error) {
        console.error('Error creating income:', error);
        return createErrorResponse('Internal server error', 500);
    }
}
import { NextRequest } from 'next/server';
import { db, finance } from '@/db';
import { getAuthenticatedUser, createErrorResponse, createSuccessResponse } from '@/lib/auth-utils';
import { createInvestmentSchema } from '@/lib/validations/finance';
import { eq } from 'drizzle-orm';

export async function GET() {
    try {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createErrorResponse('Unauthorized', 401);
        }

        const investments = await db
            .select()
            .from(finance.investments)
            .where(eq(finance.investments.userId, user.id));

        return createSuccessResponse(investments);
    } catch (error) {
        console.error('Error fetching investments:', error);
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
        const validationResult = createInvestmentSchema.safeParse(body);

        if (!validationResult.success) {
            return createErrorResponse(
                validationResult.error.issues.map(e => e.message).join(', '),
                400
            );
        }

        const { name, type, symbol, quantity, purchasePrice, currentPrice, description, purchaseDate } = validationResult.data;

        const newInvestment = await db
            .insert(finance.investments)
            .values({
                userId: user.id,
                name,
                type,
                symbol: symbol || null,
                quantity,
                purchasePrice,
                currentPrice: currentPrice || null,
                description,
                purchaseDate: new Date(purchaseDate),
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();

        return createSuccessResponse(newInvestment[0], 201);
    } catch (error) {
        console.error('Error creating investment:', error);
        return createErrorResponse('Internal server error', 500);
    }
}
import { NextRequest } from 'next/server';
import { db, finance } from '@/db';
import { getAuthenticatedUser, createErrorResponse, createSuccessResponse } from '@/lib/auth-utils';
import { createAssetSchema } from '@/lib/validations/finance';
import { eq } from 'drizzle-orm';

export async function GET() {
    try {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createErrorResponse('Unauthorized', 401);
        }

        const assets = await db
            .select()
            .from(finance.assets)
            .where(eq(finance.assets.userId, user.id));

        return createSuccessResponse(assets);
    } catch (error) {
        console.error('Error fetching assets:', error);
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
        const validationResult = createAssetSchema.safeParse(body);

        if (!validationResult.success) {
            return createErrorResponse(
                validationResult.error.errors.map(e => e.message).join(', '),
                400
            );
        }

        const { name, type, value, description, purchaseDate } = validationResult.data;

        const newAsset = await db
            .insert(finance.assets)
            .values({
                userId: user.id,
                name,
                type,
                value,
                description,
                purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();

        return createSuccessResponse(newAsset[0], 201);
    } catch (error) {
        console.error('Error creating asset:', error);
        return createErrorResponse('Internal server error', 500);
    }
}
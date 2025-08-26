import { NextRequest } from 'next/server';
import { db, finance } from '@/db';
import { getAuthenticatedUser, createErrorResponse, createSuccessResponse } from '@/lib/auth-utils';
import { updateAssetSchema } from '@/lib/validations/finance';
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

        const asset = await db
            .select()
            .from(finance.assets)
            .where(and(
                eq(finance.assets.id, id),
                eq(finance.assets.userId, user.id)
            ))
            .limit(1);

        if (asset.length === 0) {
            return createErrorResponse('Asset not found', 404);
        }

        return createSuccessResponse(asset[0]);
    } catch (error) {
        console.error('Error fetching asset:', error);
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
        const validationResult = updateAssetSchema.safeParse(body);

        if (!validationResult.success) {
            return createErrorResponse(
                validationResult.error.errors.map(e => e.message).join(', '),
                400
            );
        }

        const updateData = { ...validationResult.data, updatedAt: new Date() };
        
        if (updateData.purchaseDate) {
            updateData.purchaseDate = new Date(updateData.purchaseDate);
        }

        const updatedAsset = await db
            .update(finance.assets)
            .set(updateData)
            .where(and(
                eq(finance.assets.id, id),
                eq(finance.assets.userId, user.id)
            ))
            .returning();

        if (updatedAsset.length === 0) {
            return createErrorResponse('Asset not found', 404);
        }

        return createSuccessResponse(updatedAsset[0]);
    } catch (error) {
        console.error('Error updating asset:', error);
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

        const deletedAsset = await db
            .delete(finance.assets)
            .where(and(
                eq(finance.assets.id, id),
                eq(finance.assets.userId, user.id)
            ))
            .returning();

        if (deletedAsset.length === 0) {
            return createErrorResponse('Asset not found', 404);
        }

        return createSuccessResponse({ message: 'Asset deleted successfully' });
    } catch (error) {
        console.error('Error deleting asset:', error);
        return createErrorResponse('Internal server error', 500);
    }
}
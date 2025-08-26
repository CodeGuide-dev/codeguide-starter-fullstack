import { NextRequest } from 'next/server';
import { db } from '@/db';
import { assets } from '@/db/schema/finance';
import { eq, and } from 'drizzle-orm';
import { getAuthenticatedUser, createResponse, createErrorResponse, validateRequiredFields } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // Get single asset
      const [asset] = await db
        .select()
        .from(assets)
        .where(and(eq(assets.id, id), eq(assets.userId, user.id)));

      if (!asset) {
        return createErrorResponse('Asset not found', 404);
      }

      return createResponse(asset);
    }

    // Get all assets for user
    const userAssets = await db
      .select()
      .from(assets)
      .where(eq(assets.userId, user.id))
      .orderBy(assets.createdAt);

    return createResponse(userAssets);
  } catch (error) {
    console.error('Error fetching assets:', error);
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
    
    const validationError = validateRequiredFields(body, ['name', 'type', 'value']);
    if (validationError) {
      return createErrorResponse(validationError, 400);
    }

    const [newAsset] = await db
      .insert(assets)
      .values({
        userId: user.id,
        name: body.name,
        type: body.type,
        value: body.value,
        description: body.description,
        acquiredDate: body.acquiredDate ? new Date(body.acquiredDate) : undefined,
      })
      .returning();

    return createResponse(newAsset, 201);
  } catch (error) {
    console.error('Error creating asset:', error);
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
      return createErrorResponse('Asset ID is required', 400);
    }

    const body = await request.json();

    const [existingAsset] = await db
      .select()
      .from(assets)
      .where(and(eq(assets.id, id), eq(assets.userId, user.id)));

    if (!existingAsset) {
      return createErrorResponse('Asset not found', 404);
    }

    const [updatedAsset] = await db
      .update(assets)
      .set({
        name: body.name ?? existingAsset.name,
        type: body.type ?? existingAsset.type,
        value: body.value ?? existingAsset.value,
        description: body.description ?? existingAsset.description,
        acquiredDate: body.acquiredDate ? new Date(body.acquiredDate) : existingAsset.acquiredDate,
        updatedAt: new Date(),
      })
      .where(and(eq(assets.id, id), eq(assets.userId, user.id)))
      .returning();

    return createResponse(updatedAsset);
  } catch (error) {
    console.error('Error updating asset:', error);
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
      return createErrorResponse('Asset ID is required', 400);
    }

    const [existingAsset] = await db
      .select()
      .from(assets)
      .where(and(eq(assets.id, id), eq(assets.userId, user.id)));

    if (!existingAsset) {
      return createErrorResponse('Asset not found', 404);
    }

    await db
      .delete(assets)
      .where(and(eq(assets.id, id), eq(assets.userId, user.id)));

    return createResponse({ message: 'Asset deleted successfully' });
  } catch (error) {
    console.error('Error deleting asset:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
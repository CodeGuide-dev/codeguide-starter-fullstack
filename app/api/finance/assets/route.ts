import { NextRequest } from "next/server";
import { db } from "@/db";
import { assets } from "@/db/schema/finance";
import { eq, and } from "drizzle-orm";
import { assetCreateSchema, assetUpdateSchema } from "@/lib/validation";
import { createApiResponse, handleApiError, handleValidationError } from "@/lib/api-utils";
import { getSession } from "@/lib/auth-client";
import { z } from "zod";

// GET /api/finance/assets - Get all assets for current user
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const userAssets = await db
      .select()
      .from(assets)
      .where(eq(assets.userId, session.user.id))
      .orderBy(assets.createdAt);

    return createApiResponse(true, userAssets);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/finance/assets - Create a new asset
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const body = await request.json();
    const validatedData = assetCreateSchema.parse(body);

    const [newAsset] = await db
      .insert(assets)
      .values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        name: validatedData.name,
        type: validatedData.type,
        value: validatedData.value.toString(),
        purchaseDate: validatedData.purchaseDate ? new Date(validatedData.purchaseDate) : undefined,
        description: validatedData.description,
      })
      .returning();

    return createApiResponse(true, newAsset, undefined, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error);
  }
}

// PUT /api/finance/assets - Update an asset
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return createApiResponse(false, undefined, "Asset ID is required", 400);
    }

    const validatedData = assetUpdateSchema.parse(updateData);

    const [updatedAsset] = await db
      .update(assets)
      .set({
        ...validatedData,
        value: validatedData.value ? validatedData.value.toString() : undefined,
        purchaseDate: validatedData.purchaseDate ? new Date(validatedData.purchaseDate) : undefined,
        updatedAt: new Date(),
      })
      .where(and(eq(assets.id, id), eq(assets.userId, session.user.id)))
      .returning();

    if (!updatedAsset) {
      return createApiResponse(false, undefined, "Asset not found", 404);
    }

    return createApiResponse(true, updatedAsset);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error);
  }
}

// DELETE /api/finance/assets - Delete an asset
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return createApiResponse(false, undefined, "Asset ID is required", 400);
    }

    const [deletedAsset] = await db
      .delete(assets)
      .where(and(eq(assets.id, id), eq(assets.userId, session.user.id)))
      .returning();

    if (!deletedAsset) {
      return createApiResponse(false, undefined, "Asset not found", 404);
    }

    return createApiResponse(true, { message: "Asset deleted successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}
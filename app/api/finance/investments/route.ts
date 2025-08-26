import { NextRequest } from "next/server";
import { db } from "@/db";
import { investments } from "@/db/schema/finance";
import { eq, and } from "drizzle-orm";
import { investmentCreateSchema, investmentUpdateSchema } from "@/lib/validation";
import { createApiResponse, handleApiError, handleValidationError } from "@/lib/api-utils";
import { getSession } from "@/lib/auth-client";
import { z } from "zod";

// GET /api/finance/investments - Get all investments for current user
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const userInvestments = await db
      .select()
      .from(investments)
      .where(eq(investments.userId, session.user.id))
      .orderBy(investments.createdAt);

    return createApiResponse(true, userInvestments);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/finance/investments - Create a new investment
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const body = await request.json();
    const validatedData = investmentCreateSchema.parse(body);

    const [newInvestment] = await db
      .insert(investments)
      .values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        name: validatedData.name,
        type: validatedData.type,
        amount: validatedData.amount.toString(),
        currentValue: validatedData.currentValue.toString(),
        purchaseDate: new Date(validatedData.purchaseDate),
        tickerSymbol: validatedData.tickerSymbol,
        description: validatedData.description,
        isActive: validatedData.isActive,
      })
      .returning();

    return createApiResponse(true, newInvestment, undefined, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error);
  }
}

// PUT /api/finance/investments - Update an investment
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return createApiResponse(false, undefined, "Investment ID is required", 400);
    }

    const validatedData = investmentUpdateSchema.parse(updateData);

    const [updatedInvestment] = await db
      .update(investments)
      .set({
        ...validatedData,
        amount: validatedData.amount ? validatedData.amount.toString() : undefined,
        currentValue: validatedData.currentValue ? validatedData.currentValue.toString() : undefined,
        purchaseDate: validatedData.purchaseDate ? new Date(validatedData.purchaseDate) : undefined,
        updatedAt: new Date(),
      })
      .where(and(eq(investments.id, id), eq(investments.userId, session.user.id)))
      .returning();

    if (!updatedInvestment) {
      return createApiResponse(false, undefined, "Investment not found", 404);
    }

    return createApiResponse(true, updatedInvestment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error);
  }
}

// DELETE /api/finance/investments - Delete an investment
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return createApiResponse(false, undefined, "Investment ID is required", 400);
    }

    const [deletedInvestment] = await db
      .delete(investments)
      .where(and(eq(investments.id, id), eq(investments.userId, session.user.id)))
      .returning();

    if (!deletedInvestment) {
      return createApiResponse(false, undefined, "Investment not found", 404);
    }

    return createApiResponse(true, { message: "Investment deleted successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}
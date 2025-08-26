import { NextRequest } from "next/server";
import { db } from "@/db";
import { income } from "@/db/schema/finance";
import { eq, and } from "drizzle-orm";
import { incomeCreateSchema, incomeUpdateSchema } from "@/lib/validation";
import { createApiResponse, handleApiError, handleValidationError } from "@/lib/api-utils";
import { getSession } from "@/lib/auth-client";
import { z } from "zod";

// GET /api/finance/income - Get all income records for current user
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const userIncome = await db
      .select()
      .from(income)
      .where(eq(income.userId, session.user.id))
      .orderBy(income.date);

    return createApiResponse(true, userIncome);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/finance/income - Create a new income record
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const body = await request.json();
    const validatedData = incomeCreateSchema.parse(body);

    const [newIncome] = await db
      .insert(income)
      .values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        source: validatedData.source,
        amount: validatedData.amount.toString(),
        frequency: validatedData.frequency,
        date: new Date(validatedData.date),
        isRecurring: validatedData.isRecurring,
        description: validatedData.description,
      })
      .returning();

    return createApiResponse(true, newIncome, undefined, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error);
  }
}

// PUT /api/finance/income - Update an income record
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return createApiResponse(false, undefined, "Income ID is required", 400);
    }

    const validatedData = incomeUpdateSchema.parse(updateData);

    const [updatedIncome] = await db
      .update(income)
      .set({
        ...validatedData,
        amount: validatedData.amount ? validatedData.amount.toString() : undefined,
        date: validatedData.date ? new Date(validatedData.date) : undefined,
        updatedAt: new Date(),
      })
      .where(and(eq(income.id, id), eq(income.userId, session.user.id)))
      .returning();

    if (!updatedIncome) {
      return createApiResponse(false, undefined, "Income record not found", 404);
    }

    return createApiResponse(true, updatedIncome);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error);
  }
}

// DELETE /api/finance/income - Delete an income record
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return createApiResponse(false, undefined, "Income ID is required", 400);
    }

    const [deletedIncome] = await db
      .delete(income)
      .where(and(eq(income.id, id), eq(income.userId, session.user.id)))
      .returning();

    if (!deletedIncome) {
      return createApiResponse(false, undefined, "Income record not found", 404);
    }

    return createApiResponse(true, { message: "Income record deleted successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}
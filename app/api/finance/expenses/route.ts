import { NextRequest } from "next/server";
import { db } from "@/db";
import { expenses } from "@/db/schema/finance";
import { eq, and } from "drizzle-orm";
import { expenseCreateSchema, expenseUpdateSchema } from "@/lib/validation";
import { createApiResponse, handleApiError, handleValidationError } from "@/lib/api-utils";
import { getSession } from "@/lib/auth-client";
import { z } from "zod";

// GET /api/finance/expenses - Get all expenses for current user
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const userExpenses = await db
      .select()
      .from(expenses)
      .where(eq(expenses.userId, session.user.id))
      .orderBy(expenses.date);

    return createApiResponse(true, userExpenses);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/finance/expenses - Create a new expense
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const body = await request.json();
    const validatedData = expenseCreateSchema.parse(body);

    const [newExpense] = await db
      .insert(expenses)
      .values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        description: validatedData.description,
        amount: validatedData.amount.toString(),
        category: validatedData.category,
        date: new Date(validatedData.date),
        isRecurring: validatedData.isRecurring,
        recurringFrequency: validatedData.recurringFrequency,
        notes: validatedData.notes,
      })
      .returning();

    return createApiResponse(true, newExpense, undefined, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error);
  }
}

// PUT /api/finance/expenses - Update an expense
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return createApiResponse(false, undefined, "Expense ID is required", 400);
    }

    const validatedData = expenseUpdateSchema.parse(updateData);

    const [updatedExpense] = await db
      .update(expenses)
      .set({
        ...validatedData,
        amount: validatedData.amount ? validatedData.amount.toString() : undefined,
        date: validatedData.date ? new Date(validatedData.date) : undefined,
        updatedAt: new Date(),
      })
      .where(and(eq(expenses.id, id), eq(expenses.userId, session.user.id)))
      .returning();

    if (!updatedExpense) {
      return createApiResponse(false, undefined, "Expense not found", 404);
    }

    return createApiResponse(true, updatedExpense);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error);
  }
}

// DELETE /api/finance/expenses - Delete an expense
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return createApiResponse(false, undefined, "Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return createApiResponse(false, undefined, "Expense ID is required", 400);
    }

    const [deletedExpense] = await db
      .delete(expenses)
      .where(and(eq(expenses.id, id), eq(expenses.userId, session.user.id)))
      .returning();

    if (!deletedExpense) {
      return createApiResponse(false, undefined, "Expense not found", 404);
    }

    return createApiResponse(true, { message: "Expense deleted successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}
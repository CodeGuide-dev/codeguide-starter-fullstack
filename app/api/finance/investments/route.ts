import { NextRequest } from 'next/server';
import { db } from '@/db';
import { investments } from '@/db/schema/finance';
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
      const [investment] = await db
        .select()
        .from(investments)
        .where(and(eq(investments.id, id), eq(investments.userId, user.id)));

      if (!investment) {
        return createErrorResponse('Investment not found', 404);
      }

      return createResponse(investment);
    }

    const userInvestments = await db
      .select()
      .from(investments)
      .where(eq(investments.userId, user.id))
      .orderBy(investments.purchaseDate);

    return createResponse(userInvestments);
  } catch (error) {
    console.error('Error fetching investments:', error);
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
    
    const validationError = validateRequiredFields(body, ['name', 'type', 'quantity', 'purchasePrice', 'purchaseDate']);
    if (validationError) {
      return createErrorResponse(validationError, 400);
    }

    const [newInvestment] = await db
      .insert(investments)
      .values({
        userId: user.id,
        name: body.name,
        type: body.type,
        symbol: body.symbol,
        quantity: body.quantity,
        purchasePrice: body.purchasePrice,
        currentPrice: body.currentPrice,
        purchaseDate: new Date(body.purchaseDate),
      })
      .returning();

    return createResponse(newInvestment, 201);
  } catch (error) {
    console.error('Error creating investment:', error);
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
      return createErrorResponse('Investment ID is required', 400);
    }

    const body = await request.json();

    const [existingInvestment] = await db
      .select()
      .from(investments)
      .where(and(eq(investments.id, id), eq(investments.userId, user.id)));

    if (!existingInvestment) {
      return createErrorResponse('Investment not found', 404);
    }

    const [updatedInvestment] = await db
      .update(investments)
      .set({
        name: body.name ?? existingInvestment.name,
        type: body.type ?? existingInvestment.type,
        symbol: body.symbol ?? existingInvestment.symbol,
        quantity: body.quantity ?? existingInvestment.quantity,
        purchasePrice: body.purchasePrice ?? existingInvestment.purchasePrice,
        currentPrice: body.currentPrice ?? existingInvestment.currentPrice,
        purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : existingInvestment.purchaseDate,
        updatedAt: new Date(),
      })
      .where(and(eq(investments.id, id), eq(investments.userId, user.id)))
      .returning();

    return createResponse(updatedInvestment);
  } catch (error) {
    console.error('Error updating investment:', error);
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
      return createErrorResponse('Investment ID is required', 400);
    }

    const [existingInvestment] = await db
      .select()
      .from(investments)
      .where(and(eq(investments.id, id), eq(investments.userId, user.id)));

    if (!existingInvestment) {
      return createErrorResponse('Investment not found', 404);
    }

    await db
      .delete(investments)
      .where(and(eq(investments.id, id), eq(investments.userId, user.id)));

    return createResponse({ message: 'Investment deleted successfully' });
  } catch (error) {
    console.error('Error deleting investment:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
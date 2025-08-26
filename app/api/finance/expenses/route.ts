import { auth } from "@/lib/auth";
import { createExpense, getExpensesByUserId, getExpenseById, updateExpense, deleteExpense } from "@/lib/services/financeService";
import { NextRequest } from "next/server";

// Create a new expense
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.name || data.amount === undefined || !data.date) {
      return new Response(
        JSON.stringify({ error: "Name, amount, and date are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const expense = await createExpense({
      ...data,
      userId: session.user.id,
    });

    return new Response(
      JSON.stringify(expense),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating expense:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create expense" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Get all expenses for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const expenses = await getExpensesByUserId(session.user.id);

    return new Response(
      JSON.stringify(expenses),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch expenses" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
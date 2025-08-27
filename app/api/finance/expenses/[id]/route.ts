import { auth } from "@/lib/auth";
import { getExpenseById, updateExpense, deleteExpense } from "@/lib/services/financeService";
import { NextRequest } from "next/server";

// Get a specific expense by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const expense = await getExpenseById(params.id, session.user.id);

    if (!expense) {
      return new Response(
        JSON.stringify({ error: "Expense not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(expense),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching expense:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch expense" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Update a specific expense by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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
    
    const expense = await updateExpense(params.id, session.user.id, data);

    if (!expense) {
      return new Response(
        JSON.stringify({ error: "Expense not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(expense),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating expense:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update expense" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Delete a specific expense by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const expense = await deleteExpense(params.id, session.user.id);

    if (!expense) {
      return new Response(
        JSON.stringify({ error: "Expense not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Expense deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting expense:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete expense" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
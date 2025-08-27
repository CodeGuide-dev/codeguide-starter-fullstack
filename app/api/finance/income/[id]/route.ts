import { auth } from "@/lib/auth";
import { getIncomeById, updateIncome, deleteIncome } from "@/lib/services/financeService";
import { NextRequest } from "next/server";

// Get a specific income by ID
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

    const income = await getIncomeById(params.id, session.user.id);

    if (!income) {
      return new Response(
        JSON.stringify({ error: "Income not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(income),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching income:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch income" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Update a specific income by ID
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
    
    const income = await updateIncome(params.id, session.user.id, data);

    if (!income) {
      return new Response(
        JSON.stringify({ error: "Income not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(income),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating income:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update income" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Delete a specific income by ID
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

    const income = await deleteIncome(params.id, session.user.id);

    if (!income) {
      return new Response(
        JSON.stringify({ error: "Income not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Income deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting income:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete income" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
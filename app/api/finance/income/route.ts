import { auth } from "@/lib/auth";
import { createIncome, getIncomesByUserId, getIncomeById, updateIncome, deleteIncome } from "@/lib/services/financeService";
import { NextRequest } from "next/server";

// Create a new income
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

    const income = await createIncome({
      ...data,
      userId: session.user.id,
    });

    return new Response(
      JSON.stringify(income),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating income:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create income" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Get all incomes for the authenticated user
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

    const incomes = await getIncomesByUserId(session.user.id);

    return new Response(
      JSON.stringify(incomes),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching incomes:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch incomes" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
import { auth } from "@/lib/auth";
import { createInvestment, getInvestmentsByUserId, getInvestmentById, updateInvestment, deleteInvestment } from "@/lib/services/financeService";
import { NextRequest } from "next/server";

// Create a new investment
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
    if (!data.name || data.quantity === undefined || data.purchasePrice === undefined) {
      return new Response(
        JSON.stringify({ error: "Name, quantity, and purchase price are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const investment = await createInvestment({
      ...data,
      userId: session.user.id,
    });

    return new Response(
      JSON.stringify(investment),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating investment:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create investment" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Get all investments for the authenticated user
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

    const investments = await getInvestmentsByUserId(session.user.id);

    return new Response(
      JSON.stringify(investments),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching investments:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch investments" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
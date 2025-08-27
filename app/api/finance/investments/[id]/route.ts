import { auth } from "@/lib/auth";
import { getInvestmentById, updateInvestment, deleteInvestment } from "@/lib/services/financeService";
import { NextRequest } from "next/server";

// Get a specific investment by ID
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

    const investment = await getInvestmentById(params.id, session.user.id);

    if (!investment) {
      return new Response(
        JSON.stringify({ error: "Investment not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(investment),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching investment:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch investment" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Update a specific investment by ID
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
    
    const investment = await updateInvestment(params.id, session.user.id, data);

    if (!investment) {
      return new Response(
        JSON.stringify({ error: "Investment not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(investment),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating investment:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update investment" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Delete a specific investment by ID
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

    const investment = await deleteInvestment(params.id, session.user.id);

    if (!investment) {
      return new Response(
        JSON.stringify({ error: "Investment not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Investment deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting investment:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete investment" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
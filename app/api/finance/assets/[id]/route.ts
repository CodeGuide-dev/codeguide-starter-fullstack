import { auth } from "@/lib/auth";
import { getAssetById, updateAsset, deleteAsset } from "@/lib/services/financeService";
import { NextRequest } from "next/server";

// Get a specific asset by ID
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

    const asset = await getAssetById(params.id, session.user.id);

    if (!asset) {
      return new Response(
        JSON.stringify({ error: "Asset not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(asset),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching asset:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch asset" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Update a specific asset by ID
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
    
    const asset = await updateAsset(params.id, session.user.id, data);

    if (!asset) {
      return new Response(
        JSON.stringify({ error: "Asset not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(asset),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating asset:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update asset" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Delete a specific asset by ID
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

    const asset = await deleteAsset(params.id, session.user.id);

    if (!asset) {
      return new Response(
        JSON.stringify({ error: "Asset not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Asset deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting asset:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete asset" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
import { auth } from "@/lib/auth";
import { createAsset, getAssetsByUserId, getAssetById, updateAsset, deleteAsset } from "@/lib/services/financeService";
import { NextRequest } from "next/server";

// Create a new asset
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
    if (!data.name || data.value === undefined) {
      return new Response(
        JSON.stringify({ error: "Name and value are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const asset = await createAsset({
      ...data,
      userId: session.user.id,
    });

    return new Response(
      JSON.stringify(asset),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating asset:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create asset" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Get all assets for the authenticated user
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

    const assets = await getAssetsByUserId(session.user.id);

    return new Response(
      JSON.stringify(assets),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching assets:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch assets" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
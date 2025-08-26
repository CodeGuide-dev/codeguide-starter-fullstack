import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/db"
import { assets } from "@/db/schema/finance"
import { eq } from "drizzle-orm"
import { z } from "zod"

const assetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["cash", "real_estate", "vehicle", "other"]),
  value: z.number().positive("Value must be positive"),
  description: z.string().optional(),
  purchaseDate: z.string().optional(),
})

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: new Headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userAssets = await db
      .select()
      .from(assets)
      .where(eq(assets.userId, session.user.id))

    return NextResponse.json(userAssets)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch assets" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: new Headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = assetSchema.parse(body)

    const newAsset = await db.insert(assets).values({
      ...validatedData,
      userId: session.user.id,
      id: crypto.randomUUID(),
    }).returning()

    return NextResponse.json(newAsset[0], { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create asset" }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/db"
import { investments } from "@/db/schema/finance"
import { eq } from "drizzle-orm"
import { z } from "zod"

const investmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["stocks", "bonds", "crypto", "mutual_funds", "etf", "other"]),
  symbol: z.string().optional(),
  quantity: z.number().positive("Quantity must be positive"),
  purchasePrice: z.number().positive("Purchase price must be positive"),
  currentPrice: z.number().positive("Current price must be positive"),
  purchaseDate: z.string().optional(),
})

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: new Headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userInvestments = await db
      .select()
      .from(investments)
      .where(eq(investments.userId, session.user.id))

    return NextResponse.json(userInvestments)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch investments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: new Headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = investmentSchema.parse(body)

    const totalValue = validatedData.quantity * validatedData.currentPrice

    const newInvestment = await db.insert(investments).values({
      ...validatedData,
      totalValue,
      userId: session.user.id,
      id: crypto.randomUUID(),
    }).returning()

    return NextResponse.json(newInvestment[0], { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create investment" }, { status: 500 })
  }
}
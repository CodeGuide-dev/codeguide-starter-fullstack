import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/db"
import { income } from "@/db/schema/finance"
import { eq } from "drizzle-orm"
import { z } from "zod"

const incomeSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  source: z.enum([
    "salary", "freelance", "investment", "business", "gift", "other"
  ]),
  description: z.string().optional(),
  date: z.string(),
  recurring: z.boolean().default(false),
  frequency: z.enum(["weekly", "monthly", "yearly"]).optional(),
})

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: new Headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userIncome = await db
      .select()
      .from(income)
      .where(eq(income.userId, session.user.id))
      .orderBy(income.date)

    return NextResponse.json(userIncome)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch income" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: new Headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = incomeSchema.parse(body)

    const newIncome = await db.insert(income).values({
      ...validatedData,
      userId: session.user.id,
      id: crypto.randomUUID(),
    }).returning()

    return NextResponse.json(newIncome[0], { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create income" }, { status: 500 })
  }
}
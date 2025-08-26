import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/db"
import { expenses } from "@/db/schema/finance"
import { eq } from "drizzle-orm"
import { z } from "zod"

const expenseSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  category: z.enum([
    "food", "transport", "housing", "utilities", "entertainment", 
    "healthcare", "education", "shopping", "other"
  ]),
  description: z.string().optional(),
  date: z.string(),
  paymentMethod: z.enum(["cash", "credit_card", "debit_card", "bank_transfer", "other"]).optional(),
})

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: new Headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userExpenses = await db
      .select()
      .from(expenses)
      .where(eq(expenses.userId, session.user.id))
      .orderBy(expenses.date)

    return NextResponse.json(userExpenses)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: new Headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = expenseSchema.parse(body)

    const newExpense = await db.insert(expenses).values({
      ...validatedData,
      userId: session.user.id,
      id: crypto.randomUUID(),
    }).returning()

    return NextResponse.json(newExpense[0], { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 })
  }
}
import { ExpenseSchema } from "@/lib/schemas/expense";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { expenses } from "@/db/schemas/schema";
import db from "@/db";
import { desc, eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const { isAuthenticated, userId } = await auth();
        if (!isAuthenticated || !userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let body: unknown;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const data = ExpenseSchema.omit({ id: true }).safeParse(body);
        if (!data.success) {
            const error = z.prettifyError(data.error);
            return NextResponse.json({ error: "Invalid input", details: error }, { status: 422 });
        }

        const { amount, date, category, name, paymentMethod } = data.data;

        const [created] = await db
            .insert(expenses)
            .values({
                user_id: userId,
                amount: amount.toString(),
                date,
                category,
                name,
                paymentMethod,
            })
            .returning({
                id: expenses.id,
                amount: expenses.amount,
                date: expenses.date,
                category: expenses.category,
                paymentMethod: expenses.paymentMethod,
                name: expenses.name,
                created_at: expenses.createdAt,
                updated_at: expenses.updatedAt,
            });

        return NextResponse.json({
            data: {
                id: created.id,
                amount: parseFloat(created.amount),
                date: created.date,
                category: created.category,
                name: created.name,
                createdAt: created.created_at,
                updatedAt: created.updated_at,
                paymentMethod: created.paymentMethod,
            }
        }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { isAuthenticated, userId } = await auth();
        if (!isAuthenticated || !userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
        const limit = parseInt(req.nextUrl.searchParams.get("size") || "10", 10);
        if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
            return NextResponse.json({ error: "Invalid pagination parameters" }, { status: 400 });
        }

        const offset = (page - 1) * limit;

        const expensesList = await db
            .select({
                id: expenses.id,
                amount: expenses.amount,
                date: expenses.date,
                category: expenses.category,
                name: expenses.name,
                createdAt: expenses.createdAt,
                updatedAt: expenses.updatedAt,
                paymentMethod: expenses.paymentMethod,
            })
            .from(expenses)
            .where(eq(expenses.user_id, userId))
            .orderBy(desc(expenses.createdAt))
            .limit(limit)
            .offset(offset);

        const formattedExpenses = expensesList.map(expense => ({
            id: expense.id,
            amount: parseFloat(expense.amount),
            date: expense.date,
            category: expense.category,
            name: expense.name,
            createdAt: expense.createdAt,
            updatedAt: expense.updatedAt,
            paymentMethod: expense.paymentMethod,
        }));

        return NextResponse.json({ data: formattedExpenses }, { status: 200 });

    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
import { ExpenseSchema } from "@/lib/schemas/expense";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { expenses } from "@/db/schemas/schema";
import db from "@/db";

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
import db from "@/db";
import { expenses } from "@/db/schemas/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/expense/[id]'>) {
    try {
        const { isAuthenticated, userId } = await auth();
        if (!isAuthenticated || !userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await ctx.params;
        
        const [deleted] = await db
            .delete(expenses)
            .where(and(eq(expenses.id, id), eq(expenses.user_id, userId)))
            .returning({ id: expenses.id });

        if (!deleted) {
            return NextResponse.json({ error: "Expense not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Expense deleted successfully", id: deleted.id }, { status: 200 });

    } catch (error) {
        console.error("Error deleting expense:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}
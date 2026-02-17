"use client";

import useDeleteExpense from "@/mutations/deleteExpense";
import { Button } from "../ui/button";

interface DeleteExpenseProps {
    expenseId: string;
}

export default function DeleteExpense({ expenseId }: DeleteExpenseProps) {
    const {mutate: deleteExpense, isPending} = useDeleteExpense();

    return (
        <Button variant="destructive" size="sm" onClick={() => deleteExpense(expenseId)} disabled={isPending} className="cursor-pointer">
            {isPending ? "Deleting..." : "Delete"}
        </Button>
    )
}
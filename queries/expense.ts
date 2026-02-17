import { ExpenseSchema } from "@/lib/schemas/expense";
import { queryOptions } from "@tanstack/react-query";

export function getRecentExpenseQueryOptions() {
    return queryOptions({
        queryKey: ["recentExpenses", { page: 1, size: 5 }],
        queryFn: async () => {
            const response = await fetch("/api/expense?page=1&size=5");
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to fetch recent expenses: ${errorData.error || response.statusText}`);
            }
            const responseData = await response.json();
            const expenses = ExpenseSchema.array().safeParse(responseData.data);
            if (!expenses.success) {
                throw new Error("Failed to parse expenses");
            }
            return expenses.data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    })
}

export function getExpensesQueryOptions(page: number, size: number) {
    return queryOptions({
        queryKey: ["expenses", { page, size }],
        queryFn: async () => {
            const response = await fetch(`/api/expense?page=${page}&size=${size}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to fetch expenses: ${errorData.error || response.statusText}`);
            }
            const responseData = await response.json();
            const expenses = ExpenseSchema.array().safeParse(responseData.data);
            if (!expenses.success) {
                throw new Error("Failed to parse expenses");
            }
            return expenses.data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    })
}
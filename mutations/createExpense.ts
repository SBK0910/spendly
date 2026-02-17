import { Expense, ExpenseSchema } from "@/lib/schemas/expense";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export function useCreateExpenseMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: Omit<Expense, "id">) => {
            console.log("Creating expense with data:", data);
            const response = await fetch("/api/expense", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to create expense: ${errorData.details || errorData.error || response.statusText}`);
            }
            const responseData = z.object({
                data: ExpenseSchema,
            }).safeParse(await response.json());

            if (!responseData.success) {
                throw new Error(`Invalid response from server: ${z.prettifyError(responseData.error)}`);
            }

            return responseData.data.data;

        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["recentExpenses"],
            });
        },
        onError: (error) => {
            console.error("Error creating expense:", error);
        }

    })
}
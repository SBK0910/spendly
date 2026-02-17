import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteExpense() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/expense/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to delete expense: ${errorData.error || response.statusText}`);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["recentExpenses"],
            });
            queryClient.invalidateQueries({
                queryKey: ["expenses"],
            })
        },
        onError: (error) => {
            console.error("Error deleting expense:", error);
        }
    })
}

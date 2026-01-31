import { z } from "zod";

z.config({
    customError: (iss) => {
        if (iss.code === "invalid_type") {
            return { message: `Expected a value of type "${iss.expected}".` };
        }
        return { message: iss.message ?? "Invalid value" };
    }
})

export const CategoryEnum = z.enum([
    "food",
    "transportation",
    "entertainment",
    "utilities",
    "shopping",
    "health",
    "subscriptions",
    "travel",
    "gifts",
    "education",
]);

export type Category = z.infer<typeof CategoryEnum>;

export const CategoryIcons: Record<Category, string> = {
    food: "🍽️",
    transportation: "🚗",
    entertainment: "🎬",
    utilities: "💡",
    shopping: "🛒",
    health: "💊",
    subscriptions: "📱",
    travel: "✈️",
    gifts: "🎁",
    education: "📚",
};

export const TransactionSchema = z.object({
    id: z.string().uuid("Invalid transaction ID"),
    amount: z.number()
        .positive("Amount must be greater than $0.00")
        .finite("Please enter a valid amount")
        .refine((val) => val <= 999999.99, "Amount cannot exceed $999,999.99"),
    date: z.date()
        .refine((date) => date <= new Date(), "Date cannot be in the future")
        .refine((date) => date >= new Date(new Date().getFullYear() - 10, 0, 1), "Date cannot be more than 10 years in the past"),
    category: CategoryEnum.refine((val) => val, "Please select a valid category"),
    name: z.string()
        .min(1, "Transaction name is required")
        .max(100, "Transaction name cannot exceed 100 characters")
        .refine((val) => val.trim().length > 0, "Transaction name cannot be empty or contain only spaces"),
});

export type Transaction = z.infer<typeof TransactionSchema>;
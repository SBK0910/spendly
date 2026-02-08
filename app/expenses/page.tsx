import CreateExpense from "@/components/dashboard/CreateExpense";
import EditExpense from "@/components/dashboard/EditExpense";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type ExpenseCategory =
    | "entertainment"
    | "food"
    | "health"
    | "shopping"
    | "transportation"
    | "utilities"
    | "subscriptions"
    | "travel"
    | "gifts"
    | "education";

interface Expense {
    id: string;
    name: string;
    category: ExpenseCategory;
    amount: number;
    date: Date;
    icon: string;
}

const expenses: Expense[] = [
    {
        id: "1",
        name: "Coffee Shop",
        category: "food",
        amount: 5.99,
        date: new Date("2026-01-31"),
        icon: "☕",
    },
    {
        id: "2",
        name: "Grocery Store",
        category: "shopping",
        amount: 52.43,
        date: new Date("2026-01-30"),
        icon: "🛒",
    },
    {
        id: "3",
        name: "Gas Station",
        category: "transportation",
        amount: 48.5,
        date: new Date("2026-01-29"),
        icon: "⛽",
    },
    {
        id: "4",
        name: "Netflix Subscription",
        category: "entertainment",
        amount: 15.99,
        date: new Date("2026-01-28"),
        icon: "🎬",
    },
    {
        id: "5",
        name: "Restaurant",
        category: "food",
        amount: 78.25,
        date: new Date("2026-01-27"),
        icon: "🍽️",
    },
    {
        id: "6",
        name: "Pharmacy",
        category: "health",
        amount: 23.4,
        date: new Date("2026-01-26"),
        icon: "💊",
    },
    {
        id: "1",
        name: "Coffee Shop",
        category: "food",
        amount: 5.99,
        date: new Date("2026-01-31"),
        icon: "☕",
    },
    {
        id: "2",
        name: "Grocery Store",
        category: "shopping",
        amount: 52.43,
        date: new Date("2026-01-30"),
        icon: "🛒",
    },
    {
        id: "3",
        name: "Gas Station",
        category: "transportation",
        amount: 48.5,
        date: new Date("2026-01-29"),
        icon: "⛽",
    },
    {
        id: "4",
        name: "Netflix Subscription",
        category: "entertainment",
        amount: 15.99,
        date: new Date("2026-01-28"),
        icon: "🎬",
    },
    {
        id: "5",
        name: "Restaurant",
        category: "food",
        amount: 78.25,
        date: new Date("2026-01-27"),
        icon: "🍽️",
    },
    {
        id: "6",
        name: "Pharmacy",
        category: "health",
        amount: 23.4,
        date: new Date("2026-01-26"),
        icon: "💊",
    },
];

export default function ExpensesPage() {
    return (
        <main className="min-h-screen bg-background px-4 mt-20">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">All Expenses</h2>
                        <p className="text-sm text-muted-foreground">
                            Review, edit, or remove expenses from your history
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <CreateExpense />
                        <Button variant="outline" size="sm">
                            Export
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Expenses</CardTitle>
                        <CardDescription>All recorded expenses</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-150 px-6">
                            <div className="space-y-3 py-3">
                                {expenses.map((expense) => (
                                    <div
                                        key={expense.id}
                                        className="flex flex-col gap-3 border-b py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between pr-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                                                {expense.icon}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{expense.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {expense.category} • {expense.date.toISOString().slice(0, 10)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between sm:justify-end gap-4">
                                            <p className="font-semibold text-sm">
                                                ${Math.abs(expense.amount).toFixed(2)}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <EditExpense expense={expense} />
                                                <Button size="sm" variant="destructive">
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}

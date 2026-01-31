import CreateTransaction from "@/components/dashboard/CreateTransaction";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const transactions = [
    {
        id: 1,
        name: "Coffee Shop",
        category: "Food & Dining",
        amount: -5.99,
        date: "2026-01-31",
        icon: "☕",
    },
    {
        id: 2,
        name: "Grocery Store",
        category: "Groceries",
        amount: -52.43,
        date: "2026-01-30",
        icon: "🛒",
    },
    {
        id: 3,
        name: "Gas Station",
        category: "Transportation",
        amount: -48.5,
        date: "2026-01-29",
        icon: "⛽",
    },
    {
        id: 4,
        name: "Netflix Subscription",
        category: "Entertainment",
        amount: -15.99,
        date: "2026-01-28",
        icon: "🎬",
    },
    {
        id: 5,
        name: "Restaurant",
        category: "Food & Dining",
        amount: -78.25,
        date: "2026-01-27",
        icon: "🍽️",
    },
    {
        id: 6,
        name: "Pharmacy",
        category: "Health",
        amount: -23.4,
        date: "2026-01-26",
        icon: "💊",
    },
];

export default function TransactionsPage() {
    return (
        <main className="min-h-screen bg-background px-4 py-12">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">All Transactions</h2>
                        <p className="text-sm text-muted-foreground">
                            Review, edit, or remove expenses from your history
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <CreateTransaction />
                        <Button variant="outline" size="sm">
                            Export
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>All recorded expenses</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {transactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="flex flex-col gap-3 border-b py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                                        {transaction.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{transaction.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {transaction.category} • {transaction.date}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-4">
                                    <p className="font-semibold text-sm">
                                        ${Math.abs(transaction.amount).toFixed(2)}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" variant="outline">
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="destructive">
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}

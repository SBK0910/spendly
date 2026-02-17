"use client";

import CreateExpense from "@/components/expenses/CreateExpense";
import EditExpense from "@/components/expenses/EditExpense";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryIcons } from "@/lib/schemas/expense";
import { getExpensesQueryOptions } from "@/queries/expense";
import { useQuery } from "@tanstack/react-query";

export default function ExpensesPage() {
    const { data, status, error } = useQuery(getExpensesQueryOptions(1, 20));
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
                                {status === 'pending' && (
                                    <div className="py-12 text-center text-sm text-muted-foreground">
                                        Loading expenses...
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="py-12 text-center text-sm text-red-500">
                                        Error loading expenses: {error?.message || 'Unknown error'}
                                    </div>
                                )}

                                {status === 'success' && data.length === 0 && (
                                    <div className="py-12 text-center text-sm text-muted-foreground">
                                        No expenses found. Create your first expense to get started!
                                    </div>
                                )}

                                {status === 'success' && data.map((expense) => (
                                    <div
                                        key={expense.id}
                                        className="flex flex-col gap-3 border-b py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between pr-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                                                {CategoryIcons[expense.category]}
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

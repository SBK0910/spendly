'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import CreateExpense from '../expenses/CreateExpense';
import { useQuery } from '@tanstack/react-query';
import { getRecentExpenseQueryOptions } from '@/queries/expense';
import { CategoryIcons } from '@/lib/schemas/expense';

export default function RecentExpenses() {
    const { data, status, error } = useQuery(getRecentExpenseQueryOptions());
    return (
        <div className="space-y-4">
            <Card>
                <CardHeader className='flex flex-row justify-between items-center'>
                    <div className='space-y-1.5'>
                        <CardTitle className='flex flex-row w-full justify-between'>Recent Expenses</CardTitle>
                        <CardDescription>Your latest spending activities</CardDescription>
                    </div>
                    <CreateExpense />
                </CardHeader>

                <div className="px-6 space-y-3">
                    {status === 'pending' && (
                        <div className="py-8 text-center text-sm text-muted-foreground">
                            Loading expenses...
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="py-8 text-center text-sm text-red-500">
                            Error loading expenses: {error?.message || 'Unknown error'}
                        </div>
                    )}

                    {status === 'success' && data.length === 0 && (
                        <div className="py-8 text-center text-sm text-muted-foreground">
                            No expenses yet. Create one to get started!
                        </div>
                    )}

                    {status === 'success' && data.map((expense) => (
                        <div
                            key={expense.id}
                            className="flex items-center justify-between py-3 border-b last:border-b-0"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                                    {CategoryIcons[expense.category]}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{expense.name}</p>
                                    <p className="text-xs text-muted-foreground">{expense.category}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-sm">${Math.abs(expense.amount).toFixed(2)}</p>
                                <p className="text-xs text-muted-foreground">{new Date(expense.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Button className="w-full cursor-pointer" size="default" asChild>
                <Link href="/expenses">View All Expenses</Link>
            </Button>
        </div>
    );
}
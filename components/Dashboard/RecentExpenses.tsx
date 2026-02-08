'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import CreateExpense from './CreateExpense';

export default function RecentExpenses() {
    const expenses = [
        {
            id: 1,
            name: 'Coffee Shop',
            category: 'Food & Dining',
            amount: -5.99,
            date: '2026-01-31',
            icon: '☕',
        },
        {
            id: 2,
            name: 'Grocery Store',
            category: 'Groceries',
            amount: -52.43,
            date: '2026-01-30',
            icon: '🛒',
        },
        {
            id: 3,
            name: 'Gas Station',
            category: 'Transportation',
            amount: -48.50,
            date: '2026-01-29',
            icon: '⛽',
        },
        {
            id: 4,
            name: 'Netflix Subscription',
            category: 'Entertainment',
            amount: -15.99,
            date: '2026-01-28',
            icon: '🎬',
        },
        {
            id: 5,
            name: 'Restaurant',
            category: 'Food & Dining',
            amount: -78.25,
            date: '2026-01-27',
            icon: '🍽️',
        },
    ];

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
                    {expenses.map((expense) => (
                        <div
                            key={expense.id}
                            className="flex items-center justify-between py-3 border-b last:border-b-0"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                                    {expense.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{expense.name}</p>
                                    <p className="text-xs text-muted-foreground">{expense.category}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-sm">${Math.abs(expense.amount).toFixed(2)}</p>
                                <p className="text-xs text-muted-foreground">{expense.date}</p>
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
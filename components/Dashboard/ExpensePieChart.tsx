'use client';

import * as React from 'react';
import { Label, Pie, PieChart, Sector } from 'recharts';
import { type PieSectorDataItem } from 'recharts/types/polar/Pie';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const chartData = [
    { category: 'food', value: 450, fill: 'var(--color-food)' },
    { category: 'transportation', value: 300, fill: 'var(--color-transportation)' },
    { category: 'entertainment', value: 200, fill: 'var(--color-entertainment)' },
    { category: 'utilities', value: 350, fill: 'var(--color-utilities)' },
    { category: 'shopping', value: 400, fill: 'var(--color-shopping)' },
    { category: 'health', value: 280, fill: 'var(--color-health)' },
    { category: 'subscriptions', value: 150, fill: 'var(--color-subscriptions)' },
    { category: 'travel', value: 520, fill: 'var(--color-travel)' },
    { category: 'gifts', value: 200, fill: 'var(--color-gifts)' },
    { category: 'education', value: 380, fill: 'var(--color-education)' },
];

const chartConfig = {
    value: {
        label: "Amount",
    },
    food: {
        label: 'Food & Dining',
        color: 'var(--chart-1)',
    },
    transportation: {
        label: 'Transportation',
        color: 'var(--chart-2)',
    },
    entertainment: {
        label: 'Entertainment',
        color: 'var(--chart-3)',
    },
    utilities: {
        label: 'Utilities',
        color: 'var(--chart-4)',
    },
    shopping: {
        label: 'Shopping',
        color: 'var(--chart-5)',
    },
    health: {
        label: 'Health & Fitness',
        color: 'var(--chart-6)',
    },
    subscriptions: {
        label: 'Subscriptions',
        color: 'var(--chart-7)',
    },
    travel: {
        label: 'Travel',
        color: 'var(--chart-8)',
    },
    gifts: {
        label: 'Gifts & Donations',
        color: 'var(--chart-9)',
    },
    education: {
        label: 'Education',
        color: 'var(--chart-10)',
    },
} satisfies ChartConfig;

export default function ExpensePieChart() {
    const id = 'pie-expense-interactive';
    const [activeCategory, setActiveCategory] = React.useState(chartData[0].category);
    const [innerRadius, setInnerRadius] = React.useState(60);

    React.useEffect(() => {
        const updateInnerRadius = () => {
            const width = window.innerWidth;
            if (width < 1024) {
                setInnerRadius(50);
            } else {
                setInnerRadius(70);
            }
        };

        updateInnerRadius();
        window.addEventListener('resize', updateInnerRadius);
        return () => window.removeEventListener('resize', updateInnerRadius);
    }, []);

    const activeIndex = React.useMemo(
        () => chartData.findIndex((item) => item.category === activeCategory),
        [activeCategory]
    );
    const categories = React.useMemo(() => chartData.map((item) => item.category), []);

    return (
        <Card data-chart={id} className="flex flex-col">
            <ChartStyle id={id} config={chartConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>Expenses by Category</CardTitle>
                    <CardDescription>Your spending distribution</CardDescription>
                </div>
                <Select value={activeCategory} onValueChange={setActiveCategory}>
                    <SelectTrigger
                        className="ml-auto h-7 w-37.5 rounded-lg pl-2.5"
                        aria-label="Select a category"
                    >
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl">
                        {categories.map((key) => {
                            const config = chartConfig[key as keyof typeof chartConfig];

                            if (!config) {
                                return null;
                            }

                            return (
                                <SelectItem
                                    key={key}
                                    value={key}
                                    className="rounded-lg [&_span]:flex"
                                >
                                    <div className="flex items-center gap-2 text-xs">
                                        <span
                                            className="flex h-3 w-3 shrink-0 rounded-xs"
                                            style={{
                                                backgroundColor: `var(--color-${key})`,
                                            }}
                                        />
                                        {config?.label}
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-87.5"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="category"
                            innerRadius={innerRadius}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            activeShape={({
                                outerRadius = 0,
                                ...props
                            }: PieSectorDataItem) => (
                                <g>
                                    <Sector {...props} outerRadius={outerRadius + 10} />
                                </g>
                            )}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-2xl lg:text-3xl font-bold"
                                                >
                                                    ${chartData[activeIndex].value.toLocaleString()}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
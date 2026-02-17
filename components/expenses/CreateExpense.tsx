"use client";

import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryEnum, CategoryIcons, Expense, ExpenseSchema, type Category, PaymentMethodEnum, PaymentMethodIcons, type PaymentMethod } from "@/lib/schemas/expense";
import { useState } from "react";
import { format } from "date-fns";
import { useCreateExpenseMutation } from "@/mutations/createExpense";

export default function CreateExpense() {
    const [open, setOpen] = useState(false);
    const { mutate: createExpense, isPending } = useCreateExpenseMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Omit<Expense, "id">>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(ExpenseSchema.omit({ id: true })) as any,
        defaultValues: {
            name: "",
            amount: 0,
            category: "food" as Category,
            date: new Date(),
            paymentMethod: "cash" as PaymentMethod,
        },
    });

    const onSubmit = (data: Omit<Expense, "id">) => {
        createExpense(data, {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
            onError: (error) => {
                console.error("Failed to create expense:", error.message);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={(newOpen) => {
            setOpen(newOpen);
            if (!newOpen) {
                reset();
            }
        }}>
            <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-2 cursor-pointer">
                    <Plus className="size-3.5" />
                    Add
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="text-left gap-1">
                    <DialogTitle className="text-base md:text-lg">Add Expense</DialogTitle>
                    <DialogDescription className="text-xs md:text-sm">
                        Record a new expense
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-3 sm:gap-4">
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Field className="col-span-2">
                                <FieldLabel htmlFor="name" className="text-xs md:text-sm">Expense Name</FieldLabel>
                                <FieldContent>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="e.g., Coffee Shop"
                                        className="text-xs md:text-sm"
                                        {...field}
                                    />
                                    <FieldError className="text-xs md:text-sm">{errors.name?.message}</FieldError>
                                </FieldContent>
                            </Field>
                        )}
                    />

                    <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => (
                            <Field className="col-span-1">
                                <FieldLabel htmlFor="amount" className="text-xs md:text-sm">Amount ($)</FieldLabel>
                                <FieldContent>
                                    <Input
                                        id="amount"
                                        type="number"
                                        step=".01"
                                        placeholder="0.00"
                                        className="text-xs md:text-sm"
                                        value={field.value || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value.includes('.')) {
                                                const [, decimal] = value.split('.');
                                                if (decimal.length > 2) {
                                                    return;
                                                }
                                            }
                                            const numValue = e.target.valueAsNumber;
                                            field.onChange(isNaN(numValue) ? 0 : numValue);
                                        }}
                                    />
                                    <FieldError className="text-xs md:text-sm">{errors.amount?.message}</FieldError>
                                </FieldContent>
                            </Field>
                        )}
                    />

                    <Controller
                        name="paymentMethod"
                        control={control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel htmlFor="paymentMethod" className="text-xs md:text-sm">Payment Method</FieldLabel>
                                <FieldContent>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="paymentMethod" className="w-full text-xs md:text-sm">
                                            <SelectValue placeholder="Select payment method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PaymentMethodEnum.options.map((method) => (
                                                <SelectItem key={method} value={method} className="text-xs md:text-sm">
                                                    <span className="flex items-center gap-2">
                                                        <span>{PaymentMethodIcons[method as PaymentMethod]}</span>
                                                        <span className="capitalize">{method.replace(/_/g, " ")}</span>
                                                    </span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FieldError className="text-xs md:text-sm">{errors.paymentMethod?.message}</FieldError>
                                </FieldContent>
                            </Field>
                        )}
                    />

                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel htmlFor="category" className="text-xs md:text-sm">Category</FieldLabel>
                                <FieldContent>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="category" className="w-full text-xs md:text-sm">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CategoryEnum.options.map((category) => (
                                                <SelectItem key={category} value={category} className="text-xs md:text-sm">
                                                    <span className="flex items-center gap-2">
                                                        <span>{CategoryIcons[category as Category]}</span>
                                                        <span className="capitalize">{category}</span>
                                                    </span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FieldError className="text-xs md:text-sm">{errors.category?.message}</FieldError>
                                </FieldContent>
                            </Field>
                        )}
                    />

                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel className="text-xs md:text-sm">Date</FieldLabel>
                                <FieldContent>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal text-xs md:text-sm"
                                            >
                                                <CalendarIcon className="mr-1 h-4 w-4" />
                                                {field.value ? format(new Date(field.value), "MM/dd/yyyy") : "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={(date) => {
                                                    if (date) {
                                                        field.onChange(date);
                                                    }
                                                }}
                                                disabled={(date) => date > new Date()}
                                                defaultMonth={field.value ? new Date(field.value) : new Date()}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FieldError className="text-xs md:text-sm">{errors.date?.message}</FieldError>
                                </FieldContent>
                            </Field>
                        )}
                    />

                    <DialogFooter className="grid grid-cols-2 gap-3 sm:gap-4 col-span-2 mt-3 sm:mt-4">
                        <Button type="button" variant="outline" onClick={() => {
                            setOpen(false);
                            reset();
                        }} className="text-xs md:text-sm">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending} className="text-xs md:text-sm">
                            {isPending ? "Adding..." : "Add Expense"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
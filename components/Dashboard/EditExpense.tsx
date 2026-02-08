"use client";

import { Pencil, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryEnum, CategoryIcons, Expense, ExpenseSchema, type Category } from "@/lib/schemas/expense";
import { useState } from "react";
import { format } from "date-fns";

interface EditExpenseProps {
    expense: Expense;
    onUpdate?: (data: Expense) => void;
}

export default function EditExpense({ expense, onUpdate }: EditExpenseProps) {
    const [open, setOpen] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<Expense>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(ExpenseSchema) as any,
        defaultValues: {
            id: expense.id,
            name: expense.name,
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
        },
    });

    const onSubmit = async (data: Expense) => {
        try {
            // TODO: Update expense in database
            console.log("Updating expense:", data);

            if (onUpdate) {
                onUpdate(data);
            }

            // Close dialog
            setOpen(false);
        } catch (error) {
            console.error("Failed to update expense:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(newOpen) => {
            setOpen(newOpen);
            if (!newOpen) {
                reset();
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs md:text-sm">
                    <Pencil className="size-3.5 mr-1" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="text-left gap-1">
                    <DialogTitle className="text-base md:text-lg">Edit Expense</DialogTitle>
                    <DialogDescription className="text-xs md:text-sm">
                        Update the expense details
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
                            <Field className="col-span-2">
                                <FieldLabel htmlFor="amount" className="text-xs md:text-sm">Amount ($)</FieldLabel>
                                <FieldContent>
                                    <Input
                                        {...field}
                                        id="amount"
                                        type="number"
                                        step=".01"
                                        placeholder="0.00"
                                        className="text-xs md:text-sm"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value.includes('.')) {
                                                const [, decimal] = value.split('.');
                                                if (decimal.length > 2) {
                                                    return;
                                                }
                                            }
                                            field.onChange(e.target.valueAsNumber);
                                        }}
                                    />
                                    <FieldError className="text-xs md:text-sm">{errors.amount?.message}</FieldError>
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
                        <Button type="submit" disabled={isSubmitting} className="text-xs md:text-sm">
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

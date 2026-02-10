import { pgTable, uuid, varchar, decimal, timestamp, pgEnum, index, text } from 'drizzle-orm/pg-core';

export const categoryEnum = pgEnum('category', [
    'food',
    'transportation',
    'entertainment',
    'utilities',
    'shopping',
    'health',
    'subscriptions',
    'travel',
    'gifts',
    'education',
]);

export const paymentMethodEnum = pgEnum('payment_method', [
    'cash',
    'credit_card',
    'debit_card',
    'bank_transfer',
    'digital_wallet',
    'other',
]);

export const expenses = pgTable('expenses', {
    user_id: text('user_id').notNull(),
    id: uuid('id').primaryKey().defaultRandom(),
    amount: decimal('amount', { precision: 8, scale: 2 }).notNull(),
    date: timestamp('date', { mode: 'date' }).notNull(),
    category: categoryEnum('category').notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    paymentMethod: paymentMethodEnum('payment_method').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
    index('expenses_category_idx').on(table.category),
    index('expenses_date_idx').on(table.date),
]);
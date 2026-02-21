import { pgTable, uuid, varchar, decimal, timestamp, index, text, boolean, unique, foreignKey } from 'drizzle-orm/pg-core';


export const expenses = pgTable('expenses', {
    user_id: text('user_id').notNull(),
    id: uuid('id').primaryKey().defaultRandom(),
    amount: decimal('amount', { precision: 8, scale: 2 }).notNull(),
    date: timestamp('date', { mode: 'date' }).notNull(),
    category: uuid('category').notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    paymentMethod: uuid('payment_method').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
    index('expenses_category_idx').on(table.category),
    index('expenses_date_idx').on(table.date),
    foreignKey({
        name: 'fk_expenses_category',
        columns: [table.category],
        foreignColumns: [categories.id],
    }).onDelete('cascade').onUpdate('cascade'),
    foreignKey({
        name: 'fk_expenses_payment_method',
        columns: [table.paymentMethod],
        foreignColumns: [paymentMethods.id],
    }).onDelete('cascade').onUpdate('cascade'),
]);

export const paymentMethods = pgTable('payment_methods', {
    user_id: text('user_id').notNull(),
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 50 }).notNull(),
    icon: varchar('icon', { length: 10 }).notNull(),
    is_active: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
    unique('payment_methods_user_id_name_unique').on(table.user_id, table.name),
])

export const categories = pgTable('categories', {
    user_id: text('user_id').notNull(),
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 50 }).notNull(),
    icon: varchar('icon', { length: 10 }).notNull(),
    is_active: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
    unique('categories_user_id_name_unique').on(table.user_id, table.name),
])
import { relations } from 'drizzle-orm';
import { pgTable, varchar, timestamp, text } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

export const users = pgTable('users', {
  id: varchar('id', { length: 24 }).primaryKey().$default(nanoid),
  email: varchar('email').notNull().unique(),
  password: varchar('password').notNull(),
  username: varchar('username').notNull(),
  role: varchar('role').notNull().default('user'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const notes = pgTable('notes', {
  id: varchar('id', { length: 24 }).primaryKey().$default(nanoid),
  userId: varchar('user_id', { length: 24 }).references(() => users.id),
  title: text('title').notNull(),
  content: text('content').notNull(),
  color: text('color'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  notes: many(notes),
}));

export const notesRelations = relations(notes, ({ one }) => ({
  user: one(users, {
    fields: [notes.userId],
    references: [users.id],
  }),
}));

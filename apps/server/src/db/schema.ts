import { relations } from 'drizzle-orm';
import { pgTable, varchar, timestamp, text, uuid } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

// supabase mirror
export const users = pgTable('auth.users', {
  id: uuid('id').primaryKey(),
  email: varchar('email'),
});

export const profiles = pgTable('profiles', {
  id: uuid('id')
    .primaryKey()
    .references(() => users.id),
  avarata_url: text('avatar_url'),
});

export const notes = pgTable('notes', {
  id: varchar('id', { length: 24 }).primaryKey().$default(nanoid),
  userId: varchar('user_id', { length: 24 }).references(() => profiles.id),
  title: text('title').notNull(),
  content: text('content').notNull(),
  color: text('color'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const usersRelations = relations(profiles, ({ many }) => ({
  notes: many(notes),
}));

export const notesRelations = relations(notes, ({ one }) => ({
  user: one(profiles, {
    fields: [notes.userId],
    references: [profiles.id],
  }),
}));

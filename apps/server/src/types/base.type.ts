import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { profiles, notes } from '@/db/schema';

export type User = InferSelectModel<typeof profiles>;
export type NewUser = InferInsertModel<typeof profiles>;

export type Note = InferSelectModel<typeof notes>;
export type NewNote = InferInsertModel<typeof notes>;

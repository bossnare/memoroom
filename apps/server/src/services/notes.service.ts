import { db } from '@/db';
import { notes } from '@/db/schema';
import { NewNote } from '@/types/base.type';
import { eq } from 'drizzle-orm';

export const NotesService = {
  async getAll() {
    const data = await db.select().from(notes);
    const count = data.length;
    return { data, count };
  },
  async getMyAll(userId: string) {
    const data = await db.select().from(notes).where(eq(notes.userId, userId));
    const count = data.length;
    return { data, count };
  },

  async getById(id: string) {
    return await db.select().from(notes).where(eq(notes.id, id));
  },
  async create(body: NewNote) {
    return await db.insert(notes).values(body).returning();
  },
};

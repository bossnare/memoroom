import { db } from '@/db';
import { notes } from '@/db/schema';
import { NewNote } from '@/types/base.type';
import { desc, eq, asc } from 'drizzle-orm';
import type { NotesQueryType } from '@/types/query.type';

export const NotesService = {
  async getAll() {
    const data = await db.select().from(notes);
    const count = data.length;
    return { data, count };
  },
  async getMyAll(userId: string, query: NotesQueryType) {
    const sort = query.sort ?? 'createdAt';
    const order = query.order ?? 'desc';

    const data = await db
      .select()
      .from(notes)
      .where(eq(notes.userId, userId))
      .orderBy(order === 'desc' ? desc(notes[sort]) : asc(notes[sort]));
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

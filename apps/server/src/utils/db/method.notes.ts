import { db } from '@/db';
import { notes, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

const getAllNotes = async () => {
  const data = await db.select().from(notes);
  const count = data.length;
  return { data, count };
};

const getNoteById = async (id: string) => {
  return await db.select().from(notes).where(eq(notes.id, id));
};

const createNote = async (body: { title: string; content: string }) => {
  return await db
    .insert(notes)
    .values({
      id: uuid(),
      ...body,
    })
    .returning();
};

export { getAllNotes, getNoteById, createNote };

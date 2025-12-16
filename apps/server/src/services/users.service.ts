import { db } from '@/db';
import { users } from '@/db/schema';
import type { NewUser, User, Note } from '@/types/base.type';
import { eq } from 'drizzle-orm';
import { NotesService } from './notes.service';

export const UsersService = {
  async getAll() {
    const data = await db.select().from(users);
    const count = data.length;
    return { data, count };
  },

  async findMeByToken(currentUserEmail: string) {
    return await db.query.users.findFirst({
      where: eq(users.email, currentUserEmail),
      with: {
        notes: true,
      },
    });
  },

  async getById(id: string) {
    return await db.select().from(users).where(eq(users.id, id));
  },
};

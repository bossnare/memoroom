import { db } from '@/db';
import { users } from '@/db/schema';
import argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { NotesService } from './notes.service';

export const UsersService = {
  async getAll() {
    const data = await db.select().from(users);
    const count = data.length;
    return { data, count };
  },

  async getById(id: string) {
    return await db.select().from(users).where(eq(users.id, id));
  },

  async create(body: { email: string; password: string; username: string }) {
    const hashedPassword = await argon2.hash(body.password);
    const user = await db
      .insert(users)
      .values({
        password: hashedPassword,
        email: body.email,
        username: body.username,
      })
      .returning(); // returning: return new data json object

    // default notes
    await NotesService.create({
      userId: user[0].id,
      title: 'Welcome to OnlineNotes!',
      content:
        'This is your first note. Feel free to edit or delete it. Start adding your own notes to keep track of your thoughts and ideas!',
      color: '#f5f5f5',
    });

    return user[0];
  },
};

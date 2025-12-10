import { db } from '@/db';
import { users } from '@/db/schema';
import argon2 from 'argon2';
import { eq } from 'drizzle-orm';

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

    return user[0];
  },
};

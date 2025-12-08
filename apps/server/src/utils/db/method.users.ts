import { db } from '@/db';
import { notes, users } from '@/db/schema';
import argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

const getAllUsers = async () => {
  const data = await db.select().from(users);
  const count = data.length;
  return { data, count };
};

const getUserById = async (id: string) => {
  return await db.select().from(users).where(eq(users.id, id));
};

const createUser = async (body: {
  email: string;
  password: string;
  username: string;
}) => {
  const hashedPassword = await argon2.hash(body.password);
  const user = await db
    .insert(users)
    .values({
      id: uuid(),
      password: hashedPassword,
      email: body.email,
      username: body.username,
    })
    .returning(); // returning: return new data json object

  const { password, ...safeUser } = user[0];

  return safeUser; // return without password
};

export { getAllUsers, getUserById, createUser };

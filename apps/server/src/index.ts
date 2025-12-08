import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { db } from './db';
import { notes, users } from './db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import { createUser, getAllUsers, getUserById } from './utils/db/method.users';
import { createNote, getAllNotes } from './utils/db/method.notes';

const app = new Elysia()
  .use(
    cors({
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      // allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
      // maxAge: 3600
    })
  )
  .get('/', () => 'Hello Elysia --powered by bun server')
  .get('/api/users', async ({ set }) => {
    const { data, count } = await getAllUsers();
    set.status = 200;

    return {
      success: true,
      timestamp: Date.now(),
      count,
      data,
    };
  })
  .get('/api/users/:id', async ({ params: { id }, set }) => {
    const userById = await getUserById(id);
    set.status = 200;

    return {
      success: true,
      timestamp: Date.now(),
      data: userById,
    };
  })
  .post(
    '/api/users/register',
    async ({ body, set }) => {
      const user = await createUser(body);
      set.status = 201;

      return {
        success: true,
        timestamp: Date.now(),
        data: user,
      };
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
        username: t.String(),
      }),
    }
  )
  .get('/api/notes', async ({ set }) => {
    const { data, count } = await getAllNotes();
    set.status = 200;

    return {
      success: true,
      timestamp: Date.now(),
      count,
      data,
    };
  })
  .post(
    '/api/notes/create',
    async ({ body, set }) => {
      const note = await createNote(body);
      set.status = 201;

      return {
        success: true,
        timestamp: Date.now(),
        data: note,
      };
    },
    {
      body: t.Object({
        title: t.String(),
        content: t.String(),
      }),
    }
  )
  .listen(5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

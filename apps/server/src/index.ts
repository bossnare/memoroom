import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { usersRoute } from './routes/users.route';
import { notesRoute } from './routes/notes.route';

const app = new Elysia({ prefix: '/api' })
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
  .use(usersRoute)
  .use(notesRoute)
  .listen(5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

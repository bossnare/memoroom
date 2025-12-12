import { cors } from '@elysiajs/cors';
import { Elysia } from 'elysia';
import { authRoute } from './routes/auth.route';
import { notesRoute } from './routes/notes.route';
import { usersRoute } from './routes/users.route';

const ENV = process.env.NODE_ENV;

const app = new Elysia({ prefix: '/api' })
  .use(
    cors(
      ENV === 'production'
        ? {
            origin: 'https://memoroom.vercel.app',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['application/json', 'Authorization'],
            maxAge: 3600,
            credentials: true,
          }
        : {
            origin: 'http://127.0.0.1:5173',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true,
          }
    )
  )
  .get('/', () => 'Hello Elysia --powered by bun server')
  .use(usersRoute)
  .use(notesRoute)
  .use(authRoute)
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

console.log(
  ENV === 'production'
    ? 'Your app is started on prod environment'
    : 'Development mode'
);

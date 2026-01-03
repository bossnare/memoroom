import { JWTPayload } from '@/types/auth.type';
import Elysia, { t } from 'elysia';
import { NotesService } from '@/services/notes.service';
import { jwtDecode } from 'jwt-decode';

export const notesRoute = new Elysia({
  prefix: '/notes',
})
  .get('/', async ({ set }) => {
    const { data, count } = await NotesService.getAll();
    set.status = 200;

    return {
      success: true,
      timestamp: Date.now(),
      count,
      data,
    };
  })
  .get('/:id', ({ params }) => NotesService.getById(params.id))
  .post(
    '/create',
    async ({ body, set, headers }) => {
      const token = headers.authorization?.split(' ')[1] as string;
      if (!token) {
        set.status = 401;
        throw new Error('Unauthorized!');
      }
      const payload: JWTPayload = jwtDecode(token);
      console.log(payload);
      const bodyPayload = {
        ...body,
        userId: payload.sub,
      };
      console.log(bodyPayload);
      const note = await NotesService.create(bodyPayload);
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
  );

import { JWTPayload } from '@/types/auth.type';
import Elysia, { t } from 'elysia';
import { NotesService } from '@/services/notes.service';
import { UsersService } from '@/services/users.service';

export const notesRoute = new Elysia({
  prefix: '/notes',
})
  .get('/', async ({ set, headers }) => {
    const token = headers.authorization?.split(' ')[1] as string;
    const { id } = await UsersService.getUserFromToken(token);
    const { data, count } = await NotesService.getMyAll(id);
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
      const { id } = await UsersService.getUserFromToken(token);
      const payload = {
        ...body,
        userId: id,
      };

      const note = await NotesService.create(payload);
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

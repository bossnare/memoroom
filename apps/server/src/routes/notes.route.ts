import Elysia, { t } from 'elysia';
import { NotesService } from '../services/notes.service';

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
    async ({ body, set }) => {
      const note = await NotesService.create(body);
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

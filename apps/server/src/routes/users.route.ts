import Elysia, { t } from 'elysia';
import { UsersService } from '../services/users.service';

export const usersRoute = new Elysia({
  prefix: '/users',
})
  .get('/', async ({ set }) => {
    const { data, count } = await UsersService.getAll();
    set.status = 200;

    const safeUser = data.map(({ password, ...rest }) => rest); // return without password

    return {
      success: true,
      timestamp: Date.now(),
      count,
      data: safeUser,
    };
  })
  .get('/:id', async ({ params, set }) => {
    const userById = await UsersService.getById(params.id);
    set.status = 200;

    return {
      success: true,
      timestamp: Date.now(),
      data: userById,
    };
  })
  .post(
    '/register',
    async ({ body, set }) => {
      const user = await UsersService.create(body);
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
  );

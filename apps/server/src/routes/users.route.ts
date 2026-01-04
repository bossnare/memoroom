import Elysia, { t } from 'elysia';
import { UsersService } from '../services/users.service';
import jwt from 'jsonwebtoken';

export const usersRoute = new Elysia({
  prefix: '/users',
})
  .get('/', async ({ set }) => {
    const { data, count } = await UsersService.getAll();
    set.status = 200;

    return {
      success: true,
      timestamp: Date.now(),
      count,
      data,
    };
  })
  .get('/me', async ({ headers, set }) => {
    const token = headers.authorization?.split(' ')[1] as string;
    if (!token) {
      set.status = 401;
      return { message: 'Unauthorized user!, without JWT token' };
    }

    const { id } = await UsersService.getUserFromToken(token);

    set.status = 200;
    const me = await UsersService.getMeById(id);

    return {
      success: true,
      timestamp: Date.now(),
      data: me,
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
  });

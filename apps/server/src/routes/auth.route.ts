import { AuthService } from '@/services/auth.service';
import Elysia, { t } from 'elysia';

export const authRoute = new Elysia({
  prefix: '/auth',
}).post(
  '/login',
  async ({ set, body }) => {
    const token = await AuthService.login(body);
    set.status = 200;

    return {
      success: true,
      token,
    };
  },
  {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  }
);

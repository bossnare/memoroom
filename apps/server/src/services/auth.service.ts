import type { JWTPayload, LoginPayload } from '@/types/auth.type';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';

export const AuthService = {
  async signToken(payload: JWTPayload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });
    return { token };
  },

  async login(body: LoginPayload) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, body.email));

    const currentUser = user[0];
    if (!currentUser) {
      throw new Error('User Not Found !');
    }
    const pwMatch = await argon2.verify(currentUser.password, body.password);
    if (!pwMatch) {
      throw new Error('Invalid credentials !');
    } else {
      const payload = {
        id: currentUser.id,
        email: currentUser.email,
        role: currentUser.role,
      };
      const { token } = await AuthService.signToken(payload);
      return token;
    }
  },
};

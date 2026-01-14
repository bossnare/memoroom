/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IS_PUBLIC_KEY } from '../decorators/public.decorator.js';

import {
  CanActivate,
  Injectable,
  UnauthorizedException,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { createRemoteJWKSet, jwtVerify } from 'jose';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private jwks: ReturnType<typeof createRemoteJWKSet>;
  private issuer: string;
  private readonly logger = new Logger(SupabaseAuthGuard.name);

  constructor(
    private reflector: Reflector,
    config: ConfigService,
  ) {
    const ref = config.get<string>('SUPABASE_PROJECT_ID');

    this.issuer = `https://${ref}.supabase.co/auth/v1`;
    this.jwks = createRemoteJWKSet(
      new URL(`${this.issuer}/.well-known/jwks.json`),
    );
  }

  // get bearer token type
  private getBearerToken(req: any) {
    const auth = req.headers['authorization'];
    if (!auth) return null;

    const [type, token] = auth.split(' ');
    if (type !== 'Bearer' || !token) return null;

    return token as string;
  }

  async canActivate(ctx: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const req = ctx.switchToHttp().getRequest();

    const token = this.getBearerToken(req);
    if (!token) throw new UnauthorizedException();

    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: this.issuer,
        algorithms: ['ES256'],
      });

      // asign payload to request
      req.user = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };

      return true;
    } catch (err) {
      this.logger.error(err);
      throw new UnauthorizedException();
    }
  }
}

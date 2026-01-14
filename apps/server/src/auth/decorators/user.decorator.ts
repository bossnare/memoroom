import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Profile as UserEntity } from '../../generated/prisma/client.js';

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx
    .switchToHttp()
    .getRequest<Request & { user: UserEntity }>();
  return request.user;
});

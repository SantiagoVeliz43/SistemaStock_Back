import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = data ? request.user[data] : request.user;

    if (!user) {
      throw new InternalServerErrorException(
        'User no encontrando en la request',
      );
    }

    return user;
  },
);

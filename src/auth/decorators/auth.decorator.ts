import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/role.guard/roles.guard';
import { RoleProtected } from './role-protected.decorator';
import { Role } from 'generated/prisma/enums';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), RolesGuard),
  );
}

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const RoleProtected = (...args: string[]) =>
  SetMetadata(ROLES_KEY, args);

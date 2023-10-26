import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/users/enums/role.enum';

export const ROLES_KEY = 'roles';
export const UserRole = (roles: Role[]) => SetMetadata(ROLES_KEY, roles);

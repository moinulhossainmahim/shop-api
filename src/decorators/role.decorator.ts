import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/users/enums/role.enum';

export const ROLE_KEY = 'role';
export const UserRole = (role: Role) => SetMetadata(ROLE_KEY, role);

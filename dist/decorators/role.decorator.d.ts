import { Role } from 'src/users/enums/role.enum';
export declare const ROLES_KEY = "roles";
export declare const UserRole: (roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;

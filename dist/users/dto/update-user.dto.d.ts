import { UserStatus } from '../enums/user-status.enum';
import { Role } from '../enums/role.enum';
export declare class UpdateUserDto {
    fullName: string;
    email: string;
    status: UserStatus;
    userType: Role;
    avatar: string;
    contact: string;
}

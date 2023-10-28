import {
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserStatus } from '../enums/user-status.enum';
import { Role } from '../enums/role.enum';

export class UpdateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  fullName: string;

  @IsString()
  @Matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    {
      message: 'Invalid email format',
    },
  )
  email: string;

  @IsEnum(UserStatus)
  status: UserStatus;

  @IsEnum(Role)
  userType: Role;

  avatar: string;

  contact: string;
}

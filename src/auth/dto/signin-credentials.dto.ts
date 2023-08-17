import { IsNotEmpty, IsString } from 'class-validator';

export class SignInCredentialsDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

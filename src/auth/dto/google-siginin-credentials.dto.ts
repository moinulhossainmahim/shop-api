import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleSignInCredentialsDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}

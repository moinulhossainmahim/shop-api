import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class SignUpCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  fullName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @Matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    {
      message: 'Invalid email format',
    },
  )
  email: string;
}

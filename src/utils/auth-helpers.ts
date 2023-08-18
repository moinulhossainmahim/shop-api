import { SignInCredentialsDto } from 'src/auth/dto/signin-credentials.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthHelpers {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  public async validateUserPassword(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ name: string; userId: string } | null> {
    const { email, password } = signInCredentialsDto;
    const user = await this.usersService.findUserByEmail(email);

    if (user && (await user.validatePassword(password))) {
      return { name: user.fullName, userId: user.id };
    } else {
      return null;
    }
  }

  public async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}

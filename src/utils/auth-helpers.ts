import { SignInCredentialsDto } from 'src/auth/dto/signin-credentials.dto';
import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/User';

@Injectable()
export class AuthHelpers {
  constructor(private readonly usersService: UsersService) {}

  public async validateUser(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<Omit<User, 'password' | 'validatePassword'> | null> {
    const { email, password } = signInCredentialsDto;
    const foundUser = await this.usersService.findUserByEmail(email);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, validatePassword, ...user } = foundUser;

    if (foundUser && (await foundUser.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  public async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}

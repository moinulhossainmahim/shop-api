import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entity/User';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(
    payload: JwtPayload,
  ): Promise<Omit<User, 'password' | 'salt' | 'validatePassword'>> {
    const { userId } = payload;
    const tempUser = await this.usersService.getUserById(userId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, validatePassword, salt, ...user } = tempUser;

    if (!tempUser) {
      throw new UnauthorizedException('Provide a valid authentication token');
    }
    return user;
  }
}

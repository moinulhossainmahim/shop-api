import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entity/User';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(payload: JwtPayload): Promise<Omit<User, 'password' | 'salt' | 'validatePassword'>>;
}
export {};

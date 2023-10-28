import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersRepository;
    private usersService;
    private jwtService;
    constructor(usersRepository: Repository<User>, usersService: UsersService, jwtService: JwtService);
    validateUser(signInCredentialsDto: SignInCredentialsDto): Promise<Omit<User, 'password' | 'validatePassword'> | null>;
    hashPassword(password: string, salt: string): Promise<string>;
    signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<CreateApiResponse<any>>;
    signIn(signInCredentialsDto: SignInCredentialsDto): Promise<CreateApiResponse<{
        accessToken: string;
    }>>;
}

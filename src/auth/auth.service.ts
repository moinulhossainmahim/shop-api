import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthHelpers } from 'src/utils/auth-helpers';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private authHelpers: AuthHelpers,
  ) {}

  public async signUp(
    signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<void> {
    const { fullName, email, password } = signUpCredentialsDto;

    const user = new User();
    user.fullName = fullName;
    user.salt = await bcrypt.genSalt();
    user.password = await this.authHelpers.hashPassword(password, user.salt);
    user.email = email;

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  public async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.authHelpers.validateUser(signInCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { name: user.fullName, userId: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}

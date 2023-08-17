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
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signUp(
    signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<void> {
    const { fullName, email, password } = signUpCredentialsDto;

    const user = new User();
    user.fullName = fullName;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
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
    const user = await this.validateUserPassword(signInCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = user;
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  private async validateUserPassword(
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

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}

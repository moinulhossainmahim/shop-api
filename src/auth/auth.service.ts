import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  public async signUp(
    signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<CreateApiResponse<any>> {
    const { fullName, email, password } = signUpCredentialsDto;

    const user = new User();
    user.fullName = fullName;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.email = email;

    try {
      await this.usersRepository.save(user);
      return {
        message: 'sign up successfully',
        data: [],
        success: true,
      };
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
  ): Promise<CreateApiResponse<{ accessToken: string }>> {
    const user = await this.validateUser(signInCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { name: user.fullName, userId: user.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      message: 'sign in successfully',
      data: { accessToken },
      success: true,
    };
  }
}

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
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  public async signIn(signInCredentialsDto: SignInCredentialsDto) {
    const user = await this.validateUserPassword(signInCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log(user);
  }

  private async validateUserPassword(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ name: string; userId: string } | null> {
    const { email, password } = signInCredentialsDto;
    const user = await this.userRepository.findOne({ where: { email } });

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

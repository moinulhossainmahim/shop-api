import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateApiResponse } from 'src/common/interfaces';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/users/enums/role.enum';
import { GoogleSignInCredentialsDto } from './dto/google-siginin-credentials.dto';
import { OAuth2Client } from 'google-auth-library';

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
    const { fullName, email, password, contact } = signUpCredentialsDto;

    const user = new User();
    if (email === 'moinulhossainmahim@gmail.com') {
      user.userType = Role.Admin;
    }
    user.fullName = fullName;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.email = email;
    user.contact = contact;

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

  public async googleSignIn(
    googleSignInCredentialsDto: GoogleSignInCredentialsDto,
  ) {
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'postmessage',
    );

    const { tokens: googleTokens } = await client.getToken(
      googleSignInCredentialsDto.code,
    );

    const profile = await client.verifyIdToken({
      idToken: googleTokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const email = profile.getPayload().email;
    const fullName = profile.getPayload().name;
    const picture = profile.getPayload().picture;

    const foundUser = await this.usersRepository.findOne({ where: { email } });

    if (!foundUser) {
      const user = new User();
      user.fullName = fullName;
      user.avatar = picture;
      user.isGoogleLogin = true;
      user.email = email;

      try {
        await this.usersRepository.save(user);
        const payload: JwtPayload = { name: user.fullName, userId: user.id };
        const accessToken = this.jwtService.sign(payload);
        return {
          message: 'sign in successfully',
          content: { accessToken },
          success: true,
        };
      } catch (error) {
        console.log('googleLoginError', error);
      }
    }

    const payload: JwtPayload = {
      name: foundUser.fullName,
      userId: foundUser.id,
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      message: 'sign in successfully',
      content: { accessToken },
      success: true,
    };
  }
}

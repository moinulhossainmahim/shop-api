import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateApiResponse } from 'src/common/interfaces';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';

@Controller('auth')
@UseInterceptors(ResponseInterceptor)
@ApiTags('authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<CreateApiResponse<any>> {
    return this.authService.signUp(signUpCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body() signInCredentialsDto: SignInCredentialsDto,
  ): Promise<CreateApiResponse<{ accessToken: string }>> {
    return this.authService.signIn(signInCredentialsDto);
  }
}

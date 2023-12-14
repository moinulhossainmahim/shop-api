import { AuthService } from './auth.service';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { CreateApiResponse } from 'src/common/interfaces';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<CreateApiResponse<any>>;
    signIn(signInCredentialsDto: SignInCredentialsDto): Promise<CreateApiResponse<{
        accessToken: string;
    }>>;
}

import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthService } from 'src/auth/auth.service';
import { CreateApiResponse, ApiGetResponse, ApiDeleteResponse } from 'src/common/interfaces';
export declare class UsersService {
    private usersRepository;
    private authService;
    constructor(usersRepository: Repository<User>, authService: AuthService);
    getAllUsers(): Promise<ApiGetResponse<User>>;
    getUserById(id: string): Promise<CreateApiResponse<User>>;
    findUserByEmail(email: string): Promise<User>;
    deleteUserById(id: string): Promise<ApiDeleteResponse>;
    updateUser(id: string, updateUserDto: Partial<UpdateUserDto>): Promise<CreateApiResponse<Partial<User>>>;
    updatePassword(id: string, updatePassword: UpdatePasswordDto): Promise<CreateApiResponse<any>>;
}

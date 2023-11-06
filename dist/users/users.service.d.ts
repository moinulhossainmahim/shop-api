import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthService } from 'src/auth/auth.service';
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

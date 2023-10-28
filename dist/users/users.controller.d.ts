/// <reference types="multer" />
import { UsersService } from './users.service';
import { User } from 'src/entity/User';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<ApiGetResponse<User>>;
    getPicture(filename: string, res: Response): Promise<void>;
    getProfile(user: User): Promise<CreateApiResponse<Partial<User>>>;
    deleteUserById(id: string): Promise<ApiDeleteResponse>;
    updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): Promise<CreateApiResponse<any>>;
    updateUser(updateUserDto: Partial<UpdateUserDto>, id: string, avatar?: Express.Multer.File): Promise<CreateApiResponse<Partial<User>>>;
}

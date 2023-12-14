import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthService } from 'src/auth/auth.service';
import {
  CreateApiResponse,
  ApiGetResponse,
  ApiDeleteResponse,
} from 'src/common/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async getAllUsers(): Promise<ApiGetResponse<User>> {
    const users = await this.usersRepository.find({
      select: ['id', 'avatar', 'email', 'fullName', 'status', 'userType'],
      relations: ['address'],
    });
    return {
      message: 'Fetched users successfully',
      success: true,
      data: users,
      meta: {},
    };
  }

  async getUserById(id: string): Promise<CreateApiResponse<User>> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: [
        'id',
        'avatar',
        'email',
        'fullName',
        'status',
        'userType',
        'contact',
      ],
      relations: ['address'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found!`);
    }
    return {
      message: 'Fetched user successfully',
      data: user,
      success: true,
    };
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Invalid credentials`);
    }
    return user;
  }

  async deleteUserById(id: string): Promise<ApiDeleteResponse> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} is not found`);
    }
    return {
      success: true,
      data: [],
      message: 'User deleted successfully',
    };
  }

  async updateUser(
    id: string,
    updateUserDto: Partial<UpdateUserDto>,
  ): Promise<CreateApiResponse<Partial<User>>> {
    const { data: user } = await this.getUserById(id);
    if (!user) {
      throw new UnauthorizedException(`User with the given ID is not found`);
    }
    try {
      await this.usersRepository.update(id, updateUserDto);
      const result = await this.usersRepository.findOne({
        where: { id },
        select: [
          'id',
          'avatar',
          'email',
          'fullName',
          'status',
          'userType',
          'contact',
        ],
        relations: ['address'],
      });
      return {
        message: 'Updated user successfully',
        success: true,
        data: result,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async updatePassword(
    id: string,
    updatePassword: UpdatePasswordDto,
  ): Promise<CreateApiResponse<any>> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const isValidated = await user.validatePassword(updatePassword.oldPassword);
    if (!isValidated) {
      throw new UnauthorizedException(
        'Old password you have provided is incorrect',
      );
    }
    user.salt = user.salt;
    user.password = await this.authService.hashPassword(
      updatePassword.newPassword,
      user.salt,
    );
    try {
      await this.usersRepository.save(user);
      return {
        data: [],
        message: 'Password updated successfully',
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

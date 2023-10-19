import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<ApiGetResponse<User>> {
    const users = await this.userRepository.find({
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

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found!`);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Invalid credentials`);
    }
    return user;
  }

  async deleteUserById(id: string): Promise<ApiDeleteResponse> {
    const result = await this.userRepository.delete(id);
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
    avatar?: Express.Multer.File,
  ): Promise<CreateApiResponse<Partial<User>>> {
    const user = await this.getUserById(id);
    if (avatar?.filename) {
      user.avatar = `http://localhost:3000/users/pictures/${avatar.filename}`;
    }
    Object.assign(user, updateUserDto);
    try {
      await this.userRepository.update(id, user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, salt, validatePassword, ...result } =
        await this.userRepository.findOne({ where: { id } });
      return {
        message: 'Updated user successfully',
        success: true,
        data: result,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

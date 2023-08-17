import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'avatar', 'email', 'fullName', 'status', 'userType'],
    });
  }

  async getUserById(id: string): Promise<User> {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found!`);
    }
    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: Partial<UpdateUserDto>,
    file?: Express.Multer.File,
  ): Promise<void> {
    const user = await this.getUserById(id);
    if (file) {
      user.avatar = `http://localhost:3000/users/pictures/${file.filename}`;
    }
    Object.assign(user, updateUserDto);
    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
    }
  }
}

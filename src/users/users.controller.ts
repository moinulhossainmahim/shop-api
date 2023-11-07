import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entity/User';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { editFilename, imageFileFilter } from 'src/products/file-upload.utils';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { ApiGetResponse } from 'src/common/get-response.interface';
import { CreateApiResponse } from 'src/common/create-response.interface';
import { GetUser } from 'src/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UserRole } from 'src/decorators/role.decorator';
import { Role } from './enums/role.enum';
import { ApiDeleteResponse } from 'src/common/delete-response.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Admin, Role.Customer])
  @UseInterceptors(ResponseInterceptor)
  async getAllUsers(): Promise<ApiGetResponse<User>> {
    return this.usersService.getAllUsers();
  }

  @Get(`pictures/:filename`)
  async getPicture(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Customer, Role.Admin])
  @UseInterceptors(ResponseInterceptor)
  getProfile(@GetUser() user: User): Promise<CreateApiResponse<Partial<User>>> {
    return this.usersService.getUserById(user.id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Admin])
  @UseInterceptors(ResponseInterceptor)
  async deleteUserById(@Param('id') id: string): Promise<ApiDeleteResponse> {
    return this.usersService.deleteUserById(id);
  }

  @Patch('/:id/update-password')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Admin, Role.Customer])
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(id, updatePasswordDto);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UserRole([Role.Customer, Role.Admin])
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFilename,
      }),
      fileFilter: imageFileFilter,
    }),
    ResponseInterceptor,
  )
  updateUser(
    @Body() updateUserDto: Partial<UpdateUserDto>,
    @Param('id') id: string,
    @UploadedFile() avatar?: Express.Multer.File,
  ): Promise<CreateApiResponse<Partial<User>>> {
    if (avatar) {
      updateUserDto.avatar = `http://localhost:3000/users/pictures/${avatar.filename}`;
    }
    return this.usersService.updateUser(id, updateUserDto);
  }
}

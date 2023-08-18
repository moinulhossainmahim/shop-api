import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entity/User';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { editFilename, imageFileFilter } from 'src/products/file-upload.utils';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(`pictures/:filename`)
  async getPicture(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }

  @Patch('/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFilename,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  updateCategory(
    @Body() updateUserDto: Partial<UpdateUserDto>,
    @Param('id') id: string,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Partial<User>> {
    return this.usersService.updateUser(id, updateUserDto, file);
  }
}

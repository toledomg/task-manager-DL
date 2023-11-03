import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UploadFileUserDto } from './dto/upload-file-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UploadAvatarUsersService } from './users.upload-avatar.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly uploadAvatarUserService: UploadAvatarUsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiProperty()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get('profile')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiProperty()
  async profile(@Request() req) {
    return this.usersService.findOne(req.user.sub);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth()
  @Put('avatar')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@Request() req, @UploadedFile() file: UploadFileUserDto) {
    const uploadAvatar = await this.uploadAvatarUserService.create({
      file,
      idUser: req.user.sub,
    });

    return uploadAvatar;
  }

  @Get()
  @ApiProperty()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiProperty()
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiProperty()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiProperty()
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { AvatarDto } from './dto/upload-file-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { UploadUserStorage } from 'src/shared/storage/storage';
import { extname } from 'path';

@Injectable()
export class UploadAvatarUsersService {
  constructor(
    private storage: UploadUserStorage,
    private userRepository: UsersRepository,
  ) {}

  async create(data: AvatarDto) {
    const extFile = extname(data.file.originalname);
    const transformName = `${data.idUser}${extFile}`;

    data.file.originalname = transformName;

    const file = await this.storage.upload(data.file, 'avatar');
    const pathAvatarUser = `avatar/${data.file.originalname}`;

    this.userRepository.uploadUserAvatar(+data.idUser, pathAvatarUser);

    return file;
  }
}

import { UploadFileUserDto } from 'src/modules/users/dto/upload-file-user.dto';

export abstract class UploadUserStorage {
  abstract upload(file: UploadFileUserDto, folder: string): Promise<any>;
}

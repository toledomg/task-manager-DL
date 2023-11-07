export class UploadFileUserDto {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export class AvatarDto {
  idUser: string;
  file: UploadFileUserDto;
}

import { Injectable } from '@nestjs/common';
import { UploadFileUserDto } from 'src/modules/users/dto/upload-file-user.dto';
import { UploadUserStorage } from './storage';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaStorage implements UploadUserStorage {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL ?? '',
      process.env.SUPABASE_KEY ?? '',
    );
  }

  async upload(file: UploadFileUserDto, folder: string): Promise<any> {
    const data = await this.client.storage
      .from(process.env.SUPABASE_BUCKET ?? '')
      .upload(`${folder}/` + file.originalname, file.buffer, {
        upsert: true,
      });
    return data;
  }
}

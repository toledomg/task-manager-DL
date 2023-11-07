import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInMemoryRepository } from './repositories/in-memory/user-in-memory.repository';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './users.service';

describe('CreateUserService', () => {
  let createUserService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtService,
        UsersService,
        {
          provide: UsersRepository,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    createUserService = moduleRef.get<UsersService>(UsersService);
  });

  it('should be able to create a new user', async () => {
    const data: CreateUserDto = {
      name: 'usertest',
      username: 'usernameTest',
      email: 'userTest@mail.com',
      password: '102030',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await createUserService.create(data);

    expect(result).toHaveProperty('id');
  });
});

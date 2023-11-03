import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { randomInt } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UploadAvatarUsersService } from './users.upload-avatar.service';

describe('User Controller', () => {
  let userController: UsersController;
  let userRepository: UsersRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UsersController],
      providers: [
        UsersService,
        UploadAvatarUsersService,
        {
          provide: UsersRepository,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: UploadAvatarUsersService,
          useValue: {
            upload: jest.fn(),
          },
        },
      ],
    }).compile();
    userController = moduleRef.get<UsersController>(UsersController);
    userRepository = moduleRef.get<UsersRepository>(UsersRepository);
  });

  it('should be able to create a new user', async () => {
    const body: CreateUserDto = {
      name: 'usertest',
      username: 'usernameTest',
      email: 'userTest@mail.com',
      password: '102030',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest.spyOn(userRepository, 'create').mockResolvedValue({
      ...body,
      id: randomInt(1, 50),
    });

    const result = await userController.create(body);

    expect(result).toHaveProperty('username');
  });
});

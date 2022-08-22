import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '@modules/users/users.controller';
import { UsersService } from '@modules/users/users.service';
import { userStub } from './stubs/user.stubs';
import { UserEntity } from '../entities/user.entity';
import { UnprocessableEntityException } from '@nestjs/common';

jest.mock('../users.service.ts');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when create is called', () => {
      let user: UserEntity | any;
      beforeEach(async () => {
        const { username, password, role, height, weight } = userStub();
        user = await controller.create({
          username,
          password,
          male: true,
          role,
          height,
          weight,
        });
      });

      it('when it should return a user', async () => {
        expect(user).toEqual(userStub());
      });
    });
  });
  describe('findAll', () => {
    describe('when findAll is called', () => {
      let users: UserEntity[];
      beforeEach(async () => {
        users = await controller.findAll();
      });
      it('when it should return users', async () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });
});

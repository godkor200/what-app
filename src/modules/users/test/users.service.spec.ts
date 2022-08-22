import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@modules/users/users.service';
import { UserEntity } from '../entities/user.entity';
import { userStub } from './stubs/user.stubs';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common/exceptions';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let repository: MockRepository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(UserEntity), useValue: mockRepository() },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<MockRepository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  describe('create', () => {
    beforeEach(async () => {
      repository.findOne.mockReturnValue(userStub());
    });
    describe('when checkUserExists is called', () => {
      it('If a user exists, should be return true', async () => {
        const result = await service.checkUserExists(userStub().username);
        expect(result).toBe(true);
      });
    });
    describe('when create is called, If a user exists', () => {
      it('should be return error', async () => {
        const result = await service.create(userStub());
        expect(repository.findOne).toHaveBeenCalledTimes(1);
        expect(result).toEqual(
          new UnprocessableEntityException('중복 되는 유저 아이디 입니다.'),
        );
      });
    });
  });
  describe('findAll', () => {
    describe('when findAll is called', () => {
      it('should be return array', async () => {
        repository.find.mockReturnValue([userStub()]);
        const result = await service.findAll();
        expect(result).toEqual([userStub()]);
      });
    });
  });
  describe('findOne', () => {
    describe('when findOne is called, If a user not exists', () => {
      beforeEach(async () => {
        repository.findOne.mockReturnValue(undefined);
      });
      it('should be return error', async () => {
        const result = await service.findOne(1);
        expect(result).toEqual(
          new NotFoundException('유저를 찾을 수 없습니다.'),
        );
      });
    });
  });
});

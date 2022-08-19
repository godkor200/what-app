import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@modules/users/users.service';
import { UserEntity } from '../entities/user.entity';
import { userStub } from './stubs/user.stubs';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UnprocessableEntityException } from '@nestjs/common/exceptions';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  findOne: jest.fn(),
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
    describe('when checkUserExists is called', () => {
      it('If a user exists, should be return true', async () => {
        repository.findOne.mockReturnValue(userStub());
        const result = await service.checkUserExists(userStub().username);
        expect(result).toBe(true);
      });
    });
    describe('when create is called, If a user exists', () => {
      //FIXME: 예외처리 제대로 못받음
      it('should be return error', async () => {
        repository.findOne.mockReturnValue(userStub());
        const result = await service.create(userStub());
        expect(result).toEqual(
          'UnprocessableEntityException: 중복 되는 유저 아이디 입니다.',
        );
      });
    });
  });
});

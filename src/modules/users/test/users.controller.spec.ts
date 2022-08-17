import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '@modules/users/users.controller';
import { UsersService } from '@modules/users/users.service';
import { userStub } from './stubs/user.stubs';

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

  describe('checkUserExists', () => {
    describe('when checkUserExists is called', () => {
      it('should be true', async () => {
        console.log(await service.findAll());
        console.log(await service.findOne('1'));
        expect(await service.checkUserExists(userStub().username)).toBe(true);
      });
    });
  });
});

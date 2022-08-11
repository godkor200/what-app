import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  private async checkUserExists(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    return user !== undefined;
  }
  async create(createUserDto: CreateUserDto) {
    if (await this.checkUserExists(createUserDto.username)) {
      throw new UnprocessableEntityException('중복 되는 유저 아이디 입니다.');
    }
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({ id }, { ...updateUserDto });
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}

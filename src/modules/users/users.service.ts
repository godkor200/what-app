import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto';
import { UserEntity } from '@modules/users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async checkUserExists(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    return user !== undefined;
  }

  async create(createUserDto: CreateUserDto) {
    if (await this.checkUserExists(createUserDto.username)) {
      return new UnprocessableEntityException('중복 되는 유저 아이디 입니다.');
    }
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      return new NotFoundException('유저를 찾을 수 없습니다.');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({ id }, { ...updateUserDto });
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}

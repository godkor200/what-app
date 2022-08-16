import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UserInfoDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userInfo: UserInfoDto) {
    const user = await this.userService.checkUserExists(userInfo.username);
    if (!user) {
      throw new NotFoundException('유저를 찾을수 없습니다.');
    }

    const userData = await this.userRepository
      .findOne({
        where: { username: userInfo.username },
      })
      .catch((err) => {
        throw new NotFoundException('유저 정보가 없습니다.');
      });

    //TODO: 비밀번호 해쉬 기능
    if (userData.password !== userInfo.password) {
      throw new ForbiddenException('비밀번호가 불일치합니다.');
    }

    const payload = {
      username: userData.username,
      id: userData.id,
    };

    const token = this.jwtService.sign(payload);

    return {
      expiresIn: '1d',
      accessToken: token,
      user: payload,
    };
  }

  public async validateUserByJwt(payload: string) {
    const user = await this.userRepository.findOne({
      where: { username: payload },
    });

    if (!user) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    return this.createJwtPayload(payload);
  }

  protected createJwtPayload(user: string) {
    const data = {
      username: user,
    };

    const jwt = this.jwtService.sign(data);
    return {
      expiresIn: '1d',
      token: jwt,
    };
  }
}

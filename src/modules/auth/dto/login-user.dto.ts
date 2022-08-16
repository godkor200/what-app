import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { PickType } from '@nestjs/mapped-types';

export class UserInfoDto extends PickType(CreateUserDto, [
  'username',
  'password',
] as const) {}

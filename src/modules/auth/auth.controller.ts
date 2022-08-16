import { AuthService } from '@/modules/auth/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserInfoDto } from '@modules/auth/dto/login-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public async login(@Body() userInfo: UserInfoDto) {
    return this.authService.login(userInfo);
  }
}

import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from '@modules/healthCheck/app.service';
import { WinstonLogger, WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller()
export class AppController {
  constructor(
    // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    // TODO: 로깅 추가 테스트와 함께 추가 해야됨
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

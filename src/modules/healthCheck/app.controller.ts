import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from '@modules/healthCheck/app.service';
import { WinstonLogger, WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller()
export class AppController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

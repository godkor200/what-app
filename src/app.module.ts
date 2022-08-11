import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '.production.env'
      : '.development.env',
  ),
});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3316,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'whatapp',
      entities: [UserEntity],
      synchronize: true,
      migrationsRun: true,
      // dropSchema: true, //this option maybe helpful
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

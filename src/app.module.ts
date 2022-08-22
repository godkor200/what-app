import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@modules/healthCheck/app.controller';
import { AppService } from '@modules/healthCheck/app.service';
import { UsersModule } from '@modules/users/users.module';
import { UserEntity } from '@modules/users/entities/user.entity';
import { RoutineEntity } from '@modules/routine/entities/routine.entities';
import { AuthModule } from '@/modules/auth/auth.module';
import { RoutineModule } from '@modules/routine/routine.module';
import { ConfigModule } from '@nestjs/config';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike('whatApp', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env', '.production.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3316,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'whatapp',
      entities: ['./modules/*/entities/*'],
      synchronize: true,
      migrationsRun: true,
      // dropSchema: true, //this option maybe helpful
    }),
    UsersModule,
    AuthModule,
    RoutineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@modules/healthCheck/app.controller';
import { AppService } from '@modules/healthCheck/app.service';
import { UsersModule } from '@modules/users/users.module';
import { UserEntity } from '@modules/users/entities/user.entity';
import { AuthModule } from '@/modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
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

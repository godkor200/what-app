import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoutineEntity } from './entities/routine.entities';

@Module({
  imports: [TypeOrmModule.forFeature([RoutineEntity])],
})
export class RoutineModule {}

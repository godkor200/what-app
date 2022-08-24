import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineEntity } from '@/modules/routine/entities/routine.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([RoutineEntity])],
})
export class RoutineModule {}

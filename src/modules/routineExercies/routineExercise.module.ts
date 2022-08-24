import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineExerciseEntity } from '@modules/routineExercies/entities/routineExercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoutineExerciseEntity])],
})
export class RoutineExerciseModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntity } from '@modules/exercise/entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseEntity])],
})
export class ExerciseModule {}

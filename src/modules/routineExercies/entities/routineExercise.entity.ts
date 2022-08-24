import { Module } from '@nestjs/common';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoutineEntity } from '@modules/routine/entities/routine.entitiy';
import { ExerciseEntity } from '@modules/exercise/entities/exercise.entity';

@Entity('routine-exercise')
export class RoutineExerciseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  routine_id: number;

  @Column()
  exercise_id: number;

  // @ManyToOne(
  //   () => RoutineEntity,
  //   (RoutineEntity) => RoutineEntity.routineExercise,
  // )
  // @JoinColumn({ name: 'routine_id' })
  // routine: RoutineEntity;

  // @ManyToOne(
  //   () => ExerciseEntity,
  //   (ExerciseEntity) => ExerciseEntity.routineExercise,
  // )
  // @JoinColumn({ name: 'exercise_id' })
  // exercise: ExerciseEntity;
}

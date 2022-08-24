import { RoutineExerciseEntity } from '@modules/routineExercies/entities/routineExercise.entity';
import { UserEntity } from '@modules/users/entities/user.entity';
import { DateEntity } from '@/utils/entities/dateEntities';

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExerciseEntity } from '@/modules/exercise/entities/exercise.entity';

@Entity('routine')
export class RoutineEntity extends DateEntity {
  @PrimaryGeneratedColumn('increment')
  routineId: number;

  @Column({ length: 30 })
  routineName: string;

  @ManyToOne((type) => UserEntity, (user) => user.routine)
  user: UserEntity;

  @ManyToMany(
    (type) => ExerciseEntity,
    (exerciseEntity) => exerciseEntity.routine,
  )
  exercise: ExerciseEntity[];
}

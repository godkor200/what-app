import { RoutineEntity } from '@/modules/routine/entities/routine.entitiy';
import { RoutineExerciseEntity } from '@/modules/routineExercies/entities/routineExercise.entity';
import { DateEntity } from '@/utils/entities/dateEntities';
import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity('exercise')
export class ExerciseEntity extends DateEntity {
  @PrimaryGeneratedColumn('increment')
  exerciseId: number;

  @Column({ length: 30 })
  exerciseName: string;

  @Column()
  exerciseSet: number;

  @Column()
  exerciseWeight: number;

  @Column({ length: 10 })
  exerciseCategory: string;

  @Column()
  exerciseDesc: string;

  @ManyToMany(
    (type) => RoutineEntity,
    (routineEntity) => routineEntity.exercise,
    { cascade: true },
  )
  @JoinTable({
    name: 'routine-exercise',
    joinColumns: [{ name: 'routine_id' }],
    inverseJoinColumns: [{ name: 'exercise_id' }],
  })
  routine: RoutineEntity[];
}

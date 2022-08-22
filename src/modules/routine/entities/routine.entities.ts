import { UserEntity } from '@/modules/users/entities/user.entity';
import { DateEntity } from '@/utils/entities/dateEntities';

import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('routine')
export class RoutineEntity extends DateEntity {
  @PrimaryGeneratedColumn('increment')
  routineId: number;

  @Column({ length: 30 })
  routineName: string;

  @ManyToOne((type) => UserEntity, (user) => user.routine)
  user: UserEntity;
}

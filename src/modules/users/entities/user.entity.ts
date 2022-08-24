import { RoutineEntity } from '@/modules/routine/entities/routine.entitiy';
import { DateEntity } from '@/utils/entities/dateEntities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends DateEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 30 })
  password: string;

  @Column()
  male: boolean;

  @Column({ length: 30 })
  role: string;

  @Column()
  height: number;

  @Column()
  weight: number;

  @OneToMany((type) => RoutineEntity, (routine) => routine.user)
  routine: RoutineEntity;
}

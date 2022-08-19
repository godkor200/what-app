import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
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
}

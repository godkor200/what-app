import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 30 })
  password: string;

  @Column()
  male: boolean;

  @Column({ length: 30 })
  role: string;

  @Column({ length: 3 })
  height: number;

  @Column({ length: 3 })
  weight: number;
}

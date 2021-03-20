import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { v4 } from 'uuid';

import { Exclude } from 'class-transformer';
import Schedule from '@modules/schedule/infra/typeorm/entities/Schedule';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column('integer')
  role: number;

  @OneToMany(() => Schedule, schedule => schedule.user)
  schedules: Schedule[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;

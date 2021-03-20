import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { v4 } from 'uuid';

import Schedule from '@modules/schedule/infra/typeorm/entities/Schedule';

@Entity('patients')
class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  birth_date: Date;

  @Column('integer')
  gender: number;

  @Column('decimal')
  height: number;

  @Column('decimal')
  weight: number;

  @OneToMany(() => Schedule, schedule => schedule.patient)
  schedules: Schedule[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Patient;

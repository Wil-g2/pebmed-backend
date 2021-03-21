import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { v4 } from 'uuid';
import User from '@modules/users/infra/typeorm/entities/User';
import Patient from '@modules/patient/infra/typeorm/entities/Patient';
import { Exclude } from 'class-transformer';

@Entity('schedules')
class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Column('text')
  note: string;

  @Column()
  date: Date;

  @Column()
  @Exclude()
  patient_id: string;

  @ManyToOne(() => Patient, patient => patient.schedules)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column()
  @Exclude()
  user_id: string;

  @ManyToOne(() => User, user => user.schedules)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Schedule;

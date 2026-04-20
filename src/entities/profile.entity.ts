import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  last_name: string;

  @Column({ type: 'text', nullable: true, default: null })
  address: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, default: null })
  phone_number: string | null;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' }) // foreign key ada di tabel profiles
  user: User;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from './profile.entity';

@Entity('users')
export class User {
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'text', nullable: true, default: null })
  refresh_token: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  role_id: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true, default: null })
  role_name: string | null;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true, // insert/update Profile otomatis saat User di-save
    onDelete: 'CASCADE', // Profile ikut terhapus saat User dihapus
    eager: false, // Profile tidak otomatis di-load, harus pakai relations: ['profile']
  })
  profile: Profile;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}

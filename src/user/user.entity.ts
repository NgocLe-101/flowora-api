import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  email: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  googleId: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName: string | null;

  @Column({ type: 'text', nullable: true })
  picture: string | null;

  @Column({ type: 'text', nullable: true })
  @Exclude({ toPlainOnly: true })
  refreshToken: string | null;

  @CreateDateColumn()
  createdAt: Date;
}

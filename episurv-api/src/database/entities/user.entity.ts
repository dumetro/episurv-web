import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  username?: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({ nullable: true, unique: true })
  phoneNumber?: string;

  @Column({ select: false }) // Hide passwords from queries
  password?: string;

  @Column({ nullable: true }) // For OTP-based login
  otpCode?: string;
}


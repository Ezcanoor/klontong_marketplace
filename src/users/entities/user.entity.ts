import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './type';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUST,
  })
  role: UserRole;

  constructor(item: Partial<User>) {
    Object.assign(this, item);
  }
}

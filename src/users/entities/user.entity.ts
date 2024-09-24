import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './type';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

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

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './type';
import { Transaction } from 'src/transactions/entities/transaction.entity';

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

  @OneToMany(() => Transaction, (photo) => photo.user)
  transactions: Transaction[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}

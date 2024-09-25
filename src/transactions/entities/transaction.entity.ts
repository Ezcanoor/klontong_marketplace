import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @Column({
    type: 'jsonb',
    name: 'item_list_id',
  })
  itemListId: number[];

  @Column({
    name: 'total_price',
  })
  totalPrice: number;

  @Column({
    name: 'coupon_rebate',
    default: 0,
  })
  couponRebate: number;

  items: Item[];

  constructor(transaction: Partial<Transaction>) {
    Object.assign(this, transaction);
  }
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'integer',
  })
  weight: number;

  @Column({
    type: 'integer',
  })
  width: number;

  @Column({
    type: 'integer',
  })
  length: number;

  @Column({
    type: 'integer',
  })
  height: number;

  @Column()
  image: string;

  @Column()
  price: number;

  constructor(item: Partial<Item>) {
    Object.assign(this, item);
  }
}

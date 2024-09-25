import { Item } from 'src/items/entities/item.entity';

export interface ItransactionsList {
  id: number;
  userId: number;
  itemListId: number[];
  totalPrice: number;
  couponRebate: number;
  items: Item[];
}

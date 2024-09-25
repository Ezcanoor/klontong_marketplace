export class CreateTransactionDto {
  id: number;
  userId: number;
  itemListId: number[];
  totalPrice: number;
  couponRebate: number;
}

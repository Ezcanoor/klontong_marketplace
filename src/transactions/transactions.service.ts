import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { UsersService } from 'src/users/users.service';
import { Item } from 'src/items/entities/item.entity';
import { paginator } from 'src/utils/paginator';
import { Paginate } from 'src/shared/paginate.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
    private readonly userService: UsersService,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const { userId } = createTransactionDto;
    const transaction = new Transaction(createTransactionDto);
    const user = await this.userService.findOne(userId);
    transaction.user = user;
    return this.entityManager.save(transaction);
  }

  async findAll({ page, size }: Paginate) {
    const { offset, limit } = paginator(page, size);
    const transactions = await this.transactionRepository.findAndCount({
      relations: { user: true },
      skip: offset,
      take: limit,
    });
    const trList = transactions[0];
    for (const el of trList) {
      const posts = await this.entityManager
        .createQueryBuilder(Item, 'item')
        .where('item.id IN (:...authors)', { authors: el.itemListId })
        .getMany();
      el.items = posts;
      delete el.itemListId;
    }
    return transactions;
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id,
      },
      relations: { user: true },
    });
    const posts = await this.entityManager
      .createQueryBuilder(Item, 'item')
      .where('item.id IN (:...authors)', { authors: transaction.itemListId })
      .getMany();
    transaction.items = posts;
    return transaction;
  }
}

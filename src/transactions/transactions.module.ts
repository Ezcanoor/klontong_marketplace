import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Item } from 'src/items/entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Item]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, UsersService],
})
export class TransactionsModule {}

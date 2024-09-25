import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from 'src/users/users.service';
import { Paginate } from 'src/shared/paginate.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly userService: UsersService,
  ) {}

  @Post('checkout')
  async checkout(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  async findAll(@Query() { page, size }: Paginate) {
    try {
      const transactions = await this.transactionsService.findAll({
        page,
        size,
      });

      return {
        page: page,
        size: size,
        totalData: transactions[1],
        data: transactions,
      };
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const transaction = await this.transactionsService.findOne(+id);
      return {
        message: 'succes get transaction details',
        data: transaction,
      };
    } catch (error) {
      return error;
    }
  }
}

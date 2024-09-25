import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginate } from 'src/shared/paginate.dto';
import { paginator } from 'src/utils/paginator';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = new Item(createItemDto);
    return this.entityManager.save(item);
  }

  async findAll({ page, size }: Paginate) {
    const { offset, limit } = paginator(page, size);
    return this.itemsRepository.findAndCount({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    return this.itemsRepository.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemsRepository.findOneBy({ id });
    for (const el in updateItemDto) {
      item[el] = updateItemDto[el];
    }
    return this.entityManager.save(item);
  }

  async remove(id: number) {
    return this.itemsRepository.delete({ id });
  }

  async searchByName(name: string) {
    return this.entityManager
      .createQueryBuilder(Item, 'item')
      .where('item.name like :name', { name: `%${name}%` })
      .getMany();
  }
}

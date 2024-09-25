import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Paginate } from 'src/shared/paginate.dto';
import { SearchItemDTO } from './dto/search.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    try {
      const items = await this.itemsService.create(createItemDto);
      return {
        message: 'success create all item data',
        data: items,
      };
    } catch (error) {
      return error;
    }
  }

  @Get()
  async findAll(@Query() { page, size }: Paginate) {
    try {
      const items = await this.itemsService.findAll({ page, size });
      return {
        message: 'success',
        page: page,
        size: size,
        totalData: items[1],
        data: items,
      };
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const item = await this.itemsService.findOne(+id);
      return {
        message: 'succes get item data',
        data: item,
      };
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    try {
      const updatedItems = await this.itemsService.update(+id, updateItemDto);
      return {
        message: 'success update item detail',
        data: updatedItems,
      };
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.itemsService.remove(+id);
    } catch (error) {
      return error;
    }
  }

  @Get('finds/byname')
  async findByName(@Query() { name }: SearchItemDTO) {
    try {
      const items = await this.itemsService.searchByName(name);
      return {
        message: 'success get item by name',
        data: items,
      };
    } catch (error) {
      return error;
    }
  }
}

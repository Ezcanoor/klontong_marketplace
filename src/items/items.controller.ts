import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    try {
      const items = await this.itemsService.create(createItemDto);
      return {
        message: 'success get all item data',
        data: items,
      };
    } catch (error) {
      return error;
    }
  }

  @Get()
  async findAll() {
    try {
      const items = await this.itemsService.findAll();
      return {
        message: 'success',
        data: items,
      };
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async indOne(@Param('id') id: string) {
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
}

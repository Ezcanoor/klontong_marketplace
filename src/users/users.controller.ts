import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return {
        message: 'success get all item data',
        data: user,
      };
    } catch (error) {
      return error;
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return {
        message: 'success',
        data: users,
      };
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(+id);
      return {
        message: 'succes get item data',
        data: user,
      };
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersService.update(+id, updateUserDto);
      return {
        message: 'success update item detail',
        data: updatedUser,
      };
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(+id);
    } catch (error) {
      return error;
    }
  }
}

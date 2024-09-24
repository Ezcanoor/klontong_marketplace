import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDTO: CreateUserDto) {
    const user = new User(createUserDTO);
    return this.entityManager.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateUserDto) {
    const item = await this.userRepository.findOneBy({ id });
    for (const el in updateItemDto) {
      item[el] = updateItemDto[el];
    }
    return this.entityManager.save(item);
  }

  async remove(id: number) {
    return this.userRepository.delete({ id });
  }
}

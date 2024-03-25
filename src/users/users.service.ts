import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { mapUserToDTO } from './mapper/user.mapper';

@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {}
  private userRepository = this.dataSource.getRepository(User);

  async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email;
    const existingUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    const newUser = await mapUserToDTO(createUserDto);

    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(filter: { email?: string; id?: number } = {}) {
    return this.userRepository.findOneBy(filter);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.findOne({ id });
    user = { ...user, ...updateUserDto };
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne({ id });
    return await this.userRepository.softRemove(user);
  }
}

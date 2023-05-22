import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserRequest: CreateUserDto): Promise<User> {
    const session = await this.usersRepository.startTransaction();
    try {
      const userId = (await this.usersRepository.countDocuments()) + 1;

      const newUser = { id: userId, ...createUserRequest };
      newUser.password = await bcrypt.hash(newUser.password, 10);
      const result = await this.usersRepository.create(
        newUser,
        {},
        { email: newUser.email },
      );
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }
  async getUser(getUserArgs: Partial<User>): Promise<User> {
    return this.usersRepository.findOne(getUserArgs);
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const session = await this.usersRepository.startTransaction();
    try {
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }
      const result = await this.usersRepository.findOneAndUpdate(
        { id: parseInt(id) },
        updateUserDto,
      );
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async deleteUser(id: string): Promise<User> {
    const session = await this.usersRepository.startTransaction();
    try {
      const result = await this.usersRepository.findOneAndDelete({
        id: id,
      });
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
}

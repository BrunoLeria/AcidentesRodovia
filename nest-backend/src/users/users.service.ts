import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserRequest: CreateUserDto): Promise<any> {
    const session = await this.usersRepository.startTransaction();
    try {
      const lastUser = await this.usersRepository.findLastDocument();
      const userId = lastUser ? lastUser.id + 1 : 1;

      const newUser = { id: userId, ...createUserRequest };
      newUser.password = await bcrypt.hash(newUser.password, 10);
      const result = await this.usersRepository.create(
        newUser,
        {},
        { email: newUser.email },
      );
      await session.commitTransaction();
      return {
        id: result.id,
        name: result.name,
        email: result.email,
      };
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
  async getUser(getUserArgs: Partial<User>): Promise<any> {
    const user = await this.usersRepository.findOne(getUserArgs);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
  async getAllUserInfo(getUserArgs: Partial<User>): Promise<any> {
    return await this.usersRepository.findOne(getUserArgs);
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
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

  async deleteUser(id: string): Promise<any> {
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

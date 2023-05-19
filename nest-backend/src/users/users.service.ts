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
      const newUser = { userId: '1', ...createUserRequest };
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
  async getUser(id: string): Promise<User> {
    return this.usersRepository.findOne({ userId: id });
  }
  async updateUser(
    id: string,
    updateUserRequest: UpdateUserDto,
  ): Promise<User> {
    const session = await this.usersRepository.startTransaction();
    try {
      if (updateUserRequest.password) {
        updateUserRequest.password = await bcrypt.hash(
          updateUserRequest.password,
          10,
        );
      }
      const result = await this.usersRepository.findOneAndUpdate(
        { userId: id },
        updateUserRequest,
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
        userId: id,
      });
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
}

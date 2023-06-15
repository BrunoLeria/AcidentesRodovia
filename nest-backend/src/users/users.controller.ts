import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';
import { UsersExceptionFilter } from './exceptions/users.excepetion.filter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseFilters(UsersExceptionFilter)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UsersExceptionFilter)
  async getUserById(@Param('id') id: number): Promise<User> {
    return await this.usersService.getUser({ id: id });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UsersExceptionFilter)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UsersExceptionFilter)
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.deleteUser(id);
  }
}

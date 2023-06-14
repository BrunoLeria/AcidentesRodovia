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
import { UserExceptionFilter } from './exceptions/user.excepetion.filter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseFilters(UserExceptionFilter)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UserExceptionFilter)
  async getUserById(@Param('id') id: number): Promise<User> {
    return await this.usersService.getUser({ id: id });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UserExceptionFilter)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UserExceptionFilter)
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.deleteUser(id);
  }
}

import { IsString, IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MaxLength(150)
  password: string;
}

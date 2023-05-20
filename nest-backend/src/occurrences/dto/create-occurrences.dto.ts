import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOccurrenceDto {
  @IsString()
  @IsNotEmpty()
  registered_at;

  @IsString()
  @IsNotEmpty()
  local;

  @IsNumber()
  @IsNotEmpty()
  occurrence_type;

  @IsNumber()
  @IsNotEmpty()
  km;

  @IsNumber()
  @IsNotEmpty()
  userId;
}

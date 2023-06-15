import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateOccurrenceDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}[-]\d{2}[-]\d{2}[T]\d{2}[:]\d{2}[:]\d{2}[.]\d{3}[Z]$/)
  registered_at;

  @IsString()
  @IsNotEmpty()
  @MaxLength(125)
  local;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(10)
  occurrence_type;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(9999)
  km;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  user_id;
}

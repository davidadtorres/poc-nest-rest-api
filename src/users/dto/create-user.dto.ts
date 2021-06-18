import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsNotEmpty()
  @IsString()
  mail: string;

  @IsNotEmpty()
  @IsString()
  pass: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}

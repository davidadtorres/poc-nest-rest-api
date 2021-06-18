import {
  IsMongoId,
  IsArray,
  ArrayNotEmpty,
  IsString,
  IsNotEmpty,
  IsUrl,
  IsDate,
} from 'class-validator';

export class CreatePostDto {
  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsMongoId()
  user_id: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  technologies: any[];

  @IsNotEmpty()
  @IsMongoId()
  category_id: string;

  @IsUrl()
  url: string;

  @IsNotEmpty()
  banner_img: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  sections: any[];
}

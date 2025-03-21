import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  readonly stock: number;

  @IsString()
  @IsUrl()
  readonly image: string;
}

export class updateProductDto extends PartialType(CreateProductDto) {}

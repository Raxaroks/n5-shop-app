import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(10)
  name: string;
  
  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  img?: string;
}

import { Controller, Post, Body, Param, Get, Patch, HttpCode, HttpStatus, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from "./dto/update-product.dto";
import { ParseMongoIdPipe } from 'src/shared/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.productService.findAll(query);
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.productService.findOne(key);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string,) {
    return this.productService.delete(id);
  }
}

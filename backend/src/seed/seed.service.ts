import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { mockedProductDtos } from './mocks/product.mock';

@Injectable()
export class SeedService {
  constructor(
    private productService: ProductService,
  ) {}

  async execute() {
    const dtos = mockedProductDtos;
    const promises = dtos.map( dto => this.productService.create(dto) );

    await Promise.all(promises);
    return 'SEED EXECUTED!!';
  }

  async nuke() {
    return this.productService.wipeoutDB();
  }
}

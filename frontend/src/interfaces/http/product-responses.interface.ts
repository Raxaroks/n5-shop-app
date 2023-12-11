import { Product } from '../entities/product.interface';

export interface GetProductResponse {
  total: number;
  page: number;
  products: Product[]
}

import { Product } from '../entities/product.interface';


export interface HttpResponse {
  statusCode: number;
  message: string;
}
export interface GetProductResponse {
  total: number;
  page: number;
  products: Product[]
}

export interface CreateUpdateProductResponse extends HttpResponse {
  product: Product;
}
  

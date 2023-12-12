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

export interface UpdateProductResponse extends HttpResponse {
  product: Product;
}
  

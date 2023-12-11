import { AxiosError, AxiosInstance } from 'axios';
import { AppConfig } from '../config/app.config';
import { axiosInstance } from '../adapters/http-common';
import { GetProductResponse } from '../interfaces/http/product-responses.interface';

export class ProductService {
  private readonly baseURL: string;
  private http: AxiosInstance;

  constructor() {
    this.baseURL = `${ AppConfig().api.products }/product`;
    this.http = axiosInstance;
  }

  async findAll(limit: number, page: number): Promise<GetProductResponse> {
    try {
      const params = { limit, page };
      const { data } =  await this.http.get<GetProductResponse>(this.baseURL, { params });
      return data;
    } catch (error) {
      console.warn(error);
      if (error instanceof AxiosError) throw new Error(error.message);
      else throw new Error('Unexpected error: unable to connect to the service');
    }
  }
}

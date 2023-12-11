import { createContext } from 'react';
import { ProductService } from '../../services/product.service';

export const ProductContext = createContext<ProductService>({} as ProductService);
import { ProviderProps } from '../../interfaces/common/provider.interface';
import { ProductService } from '../../services/product.service';
import { ProductContext } from './product.context';

export const ProductProvider = ({ children }: ProviderProps) => {
  const productService = new ProductService();

  return (
    <>
      <ProductContext.Provider value={ productService }>
        { children }
      </ProductContext.Provider>
    </>
  );
}

import { Route } from '.';
import { ProductProvider } from '../context/product/product.provider';
import { CreateProductPage, ProductListPage } from '../screens';

export const productRoutes: Route[] = [
  {
    to: 'products',
    path: '/products',
    name: `Lista de Products`,
    Component: ProductListPage,
    Provider: ProductProvider
  },
  {
    to: 'create-product',
    path: '/create-product',
    name: `Crear un producto`,
    Component: CreateProductPage
  }
];

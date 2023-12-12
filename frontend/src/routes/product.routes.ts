import { Route } from '.';
import { ProductProvider } from '../context/product';
import { CreateProductPage, ProductListPage } from '../screens';

export const productRoutes: Route[] = [
  {
    to: 'products',
    path: '/products',
    name: `Lista de productos`,
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

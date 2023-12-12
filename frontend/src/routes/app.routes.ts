import { LazyExoticComponent } from 'react';
import { AppConfig } from '../config/app.config';
import { MainPage } from '../screens';
import { ProviderProps } from "../interfaces/common/provider.interface";
import { ShoppingCartProvider } from '../context/shopping-cart';

export type JSXFuncionalComponent = () => JSX.Element;
export type JSXFunctionalProvider = (props: ProviderProps) => JSX.Element

export interface Route {
  to: string;
  path: string;
  name?: string;
  Component: LazyExoticComponent<JSXFuncionalComponent> | JSXFuncionalComponent,
  Provider?: JSXFunctionalProvider;
}

export const appRoutes: Route[] = [
  {
    to: '',
    path: '*',
    name: `${ AppConfig().app.name }`,
    Component: MainPage,
    Provider: ShoppingCartProvider
  }
]

import { useEffect } from 'react';
import { AppConfig } from '../config/app.config';

export const CreateProductPage = () => {
  useEffect( () => {
    document.title = `${ AppConfig().app.name } | Crear un producto`
  }, [] );

  return (
    <h2>CreateProductPage</h2>
  )
}

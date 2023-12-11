
import { toTitleCase, formatNumberToCurrency } from '../helpers';
import { Product } from '../interfaces/entities/product.interface';
import noPictureImg from '../assets/images/no-picture.png'


export interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, stock, img } = product;

  return (
    <div className='product__card'>
      <img src={ (img) ? img : noPictureImg } alt={ name } />
      <h3 className='product__card-title'>{ toTitleCase(name) }</h3>
      <div className="product__card-extra">
        <span>Disponibles: { stock }</span>
        <span className='product__card-extra__price' >
          { formatNumberToCurrency(price, 'es-AR', 'ARS') }
        </span>
      </div>
    </div>
  )
}


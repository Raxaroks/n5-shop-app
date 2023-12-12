
import { toTitleCase, formatNumberToCurrency } from '../helpers';
import { Product } from '../interfaces/entities/product.interface';
import noPictureImg from '../assets/images/no-picture.png'
import { useContext, useEffect, useState } from 'react';
import { ShoppingCartContext } from '../context/shopping-cart';


export interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, stock, img, id } = product;

  const { items, addToCart, removeFromCart } = useContext(ShoppingCartContext);
  const [inCart, setInCart] = useState(false)

  const getQuantityOnCart = () => {
    const found = items.find( item => item.product.id === id );
    return found?.quantity || 0;
  }

  const calculateAvailability = (): number => {
    const itemQuantity = getQuantityOnCart();
    return stock - itemQuantity;
  }

  useEffect( () => {
    const index = items.findIndex( ({ product }) => product.id === id );
    const flag = (index > -1);
    setInCart(flag);
  }, [items] );

  return (
    <div className='product__card'>
      <img src={ (img) ? img : noPictureImg } alt={ name } />
      <h3 className='product__card-title'>{ toTitleCase(name) }</h3>
      <div className="product__card-extra">
        <span>Disponibles: { calculateAvailability() }</span>
        <span className='product__card-extra__price' >
          { formatNumberToCurrency(price, 'es-AR', 'ARS') }
        </span>

        <div className="product__card-extra__buttons">
          {
            (!inCart)
              ? (<button className={ (calculateAvailability() !== 0) ? 'button' : 'button disabled' } 
                  onClick={ () => addToCart({ product, quantity: 1 }) }
                  disabled={ calculateAvailability() === 0 }>                  
                    <i className="fa-solid fa-plus"></i>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>)
              : (<>
                <button className='button'
                  onClick={ () => removeFromCart({ product, quantity: 1 }) }><i className="fa-solid fa-minus"></i></button>
                <span>{ getQuantityOnCart() }</span>
                <button className={ (calculateAvailability() !== 0) ? 'button' : 'button disabled' }
                  onClick={ () => addToCart({ product, quantity: 1 }) }
                  disabled={ calculateAvailability() === 0 }><i className="fa-solid fa-plus"></i></button>
              </>)
          }
        </div>
      </div>
    </div>
  )
}


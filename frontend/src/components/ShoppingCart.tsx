import { useContext } from 'react';
import { ShoppingCartContext } from '../context/shopping-cart';
import { formatNumberToCurrency, toTitleCase } from '../helpers';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/entities/product.interface';

export interface ShoppingCartProps {
  productService: ProductService
}

export const ShoppingCart = ({ productService }: ShoppingCartProps) => {
  const { items, clearCart, calculateCartTotal } = useContext(ShoppingCartContext);

  const cartEmpty = () => {
    return items.length === 0;
  }

  const calculateTotal = () => {
    const total = calculateCartTotal();
    return formatNumberToCurrency(total, 'es-AR', 'ARS')
  }

  const buyCart = async () => {
    try {

      // collect array of promises
      const promises = items.map( item => {
        const { quantity } = item;
        const { id, stock: available } = item.product;

        const toUpdate: Product = {
          ...item.product,
          stock: available - quantity // obtain the new availability per product
        };

        delete toUpdate.id;
        return productService.update(id!, toUpdate)
      } );
      
      await Promise.resolve(promises);
      
      // clear cart
      clearCart();
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <div className="sidebar__cart">
      <div className="cart__header">
        <i className="fa-solid fa-cart-shopping"></i>
        <h4>Tu carrito de compras</h4>
      </div>
      <ul className="cart__content">
        {
          (items.length > 0)
            ? <>
              {items.map(item => (
                <li key={item.product.id}>
                  <h3>{toTitleCase(item.product.name)}</h3>

                  <span>En carrito: {item.quantity}</span>
                  <span>{formatNumberToCurrency(item.product.price * item.quantity, 'es-AR', 'ARS')}</span>
                </li>
              ))} <strong className='mt-1'>Total: {calculateTotal()}</strong>
            </>
            : (<p>Agrega productos a tu carrito!</p>)
        }

      </ul>
      <div className="cart__actions">
        <button className={
          cartEmpty()
            ? 'button-secondary disabled'
            : 'button-secondary'
        }
          disabled={cartEmpty()}
          onClick={() => clearCart()}>Limpiar</button>
        <button className={
          cartEmpty()
            ? 'button disabled'
            : 'button'
        }
          onClick={ () => buyCart() }
          disabled={cartEmpty()}>Comprar</button>
      </div>
    </div>
  )
}

import { NavLink, useLocation } from 'react-router-dom'
import { productRoutes } from '../routes'
import { ShoppingCart } from '.';
import { ProductService } from '../services/product.service';


export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="app__sidebar">
      <ul className='sidebar__nav'>
        {
          productRoutes.map(({ name, to, path }) => (
            <li className={
              pathname === path ?  `sidebar__nav-item sidebar__nav-item--active` : 'sidebar__nav-item'
             } key={to}>
              <NavLink to={path}>
                <span>{name}</span>
              </NavLink>
            </li>
          ))
        }
      </ul>

      {/* shopping cart */}
      <ShoppingCart productService={ new ProductService() } />

      <footer className="sidebar__footer">
        &copy; 2023. Hecho por Andrés Ornelas. Derechos reservados.
      </footer>
    </nav>
  )
}


import { NavLink, useLocation } from 'react-router-dom'
import { productRoutes } from '../routes'


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
    </nav>
  )
}


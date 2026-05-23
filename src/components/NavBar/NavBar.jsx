import { NavLink } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget.jsx';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <nav className={styles.nav} aria-label="Navegacion principal">
      <NavLink
        className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
        to="/"
      >
        Inicio
      </NavLink>
      <NavLink
        className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
        to="/productos"
      >
        Libros
      </NavLink>
      <NavLink
        className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
        to="/carrito"
        aria-label="Ir al carrito"
      >
        <CartWidget />
      </NavLink>
    </nav>
  );
}

export default NavBar;

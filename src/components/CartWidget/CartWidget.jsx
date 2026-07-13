import { FaShoppingCart } from 'react-icons/fa';
import { useCarrito } from '../../context/CarritoContext.jsx';
import styles from './CartWidget.module.css';

function CartWidget() {
  const { cantidadCarrito } = useCarrito();

  return (
    <span className={styles.cartWidget}>
      <FaShoppingCart size={18} aria-hidden="true" />
      <span className="ms-1 d-none d-sm-inline">Carrito</span>
      {cantidadCarrito > 0 && (
        <span className={`${styles.badge} ms-1 badge bg-danger rounded-pill`}>
          {cantidadCarrito}
        </span>
      )}
    </span>
  );
}

export default CartWidget;


import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import styles from './CartWidget.module.css';

function CartWidget() {
  const { cartQuantity } = useCart();

  return (
    <span className={styles.cartWidget}>
      <ShoppingCart size={20} aria-hidden="true" />
      <span>Carrito</span>
      <span className={styles.badge}>{cartQuantity}</span>
    </span>
  );
}

export default CartWidget;

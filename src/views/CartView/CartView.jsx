import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { formatPrice } from '../../utils/formatPrice.js';
import styles from './CartView.module.css';

function CartView() {
  const { cart, cartTotal, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <section className={styles.empty}>
        <h1>Tu carrito esta vacio</h1>
        <p>Cuando agregues libros desde el detalle, van a aparecer aca.</p>
        <Link to="/productos">Explorar catalogo</Link>
      </section>
    );
  }

  return (
    <section className={styles.cart}>
      <div className={styles.heading}>
        <h1>Carrito de compras</h1>
        <button type="button" onClick={clearCart}>
          Vaciar carrito
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.items}>
          {cart.map((item) => (
            <article className={styles.item} key={item.id}>
              <img src={item.imagen} alt={`Tapa de ${item.titulo}`} />
              <div className={styles.itemInfo}>
                <h2>{item.titulo}</h2>
                <p>{item.autor}</p>
                <span>
                  {item.quantity} x {formatPrice(item.precio)}
                </span>
              </div>
              <strong>{formatPrice(item.precio * item.quantity)}</strong>
              <button
                className={styles.iconButton}
                type="button"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Quitar ${item.titulo}`}
              >
                <Trash2 size={18} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>

        <aside className={styles.summary}>
          <h2>Resumen</h2>
          <div className={styles.totalRow}>
            <span>Total</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
          <Link to="/productos">Seguir comprando</Link>
        </aside>
      </div>
    </section>
  );
}

export default CartView;

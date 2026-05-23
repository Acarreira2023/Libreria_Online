import { CheckCircle2, Heart, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ItemCount from '../../components/ItemCount/ItemCount.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { getProductById } from '../../services/products.js';
import { formatPrice } from '../../utils/formatPrice.js';
import styles from './ItemDetailContainer.module.css';

function ItemDetailContainer() {
  const { id } = useParams();
  const { addToCart, getItemQuantity } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setError('');

    getProductById(id)
      .then((data) => {
        if (!data) {
          setError('El libro solicitado no existe.');
          return;
        }

        setProduct(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner label="Cargando detalle..." />;
  }

  if (error) {
    return (
      <section className={styles.notFound}>
        <p className="feedback error">{error}</p>
        <Link to="/productos">Volver al catalogo</Link>
      </section>
    );
  }

  const quantityInCart = getItemQuantity(product.id);
  const availableStock = product.stock - quantityInCart;
  const hasStock = availableStock > 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    setMessage('');

    window.setTimeout(() => {
      addToCart(product, quantity);
      setMessage(`${quantity} libro(s) agregado(s) al carrito.`);
      setQuantity(1);
      setIsAdding(false);
    }, 450);
  };

  return (
    <section className={styles.detail}>
      <img className={styles.cover} src={product.imagen} alt={`Tapa de ${product.titulo}`} />

      <div className={styles.info}>
        <span className={styles.category}>{product.categoria}</span>
        <h1>{product.titulo}</h1>
        <p className={styles.author}>Por {product.autor}</p>
        <p className={styles.description}>{product.descripcion}</p>

        <div className={styles.buyBox}>
          <div>
            <span className={styles.price}>{formatPrice(product.precio)}</span>
            <span className={styles.stock}>
              {hasStock ? `Disponibles: ${availableStock}` : 'Sin stock disponible'}
            </span>
          </div>

          <ItemCount
            quantity={quantity}
            stock={Math.max(availableStock, 1)}
            disabled={!hasStock || isAdding}
            onAdd={() => setQuantity((current) => Math.min(current + 1, availableStock))}
            onSubtract={() => setQuantity((current) => Math.max(current - 1, 1))}
          />

          <div className={styles.actions}>
            <button
              className={styles.addButton}
              type="button"
              onClick={handleAddToCart}
              disabled={!hasStock || isAdding}
            >
              <ShoppingCart size={18} aria-hidden="true" />
              {isAdding ? 'Agregando...' : 'Agregar al carrito'}
            </button>
            <button
              className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
              type="button"
              onClick={() => setIsFavorite((current) => !current)}
            >
              <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" />
              Favorito
            </button>
          </div>

          {message && (
            <p className={styles.success}>
              <CheckCircle2 size={18} aria-hidden="true" />
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ItemDetailContainer;

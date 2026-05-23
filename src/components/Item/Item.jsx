import { Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice.js';
import styles from './Item.module.css';

function Item({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className={styles.card}>
      <button
        className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
        type="button"
        onClick={() => setIsFavorite((current) => !current)}
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
      >
        <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" />
      </button>

      <img className={styles.cover} src={product.imagen} alt={`Tapa de ${product.titulo}`} />

      <div className={styles.body}>
        <span className={styles.category}>{product.categoria}</span>
        <h2>{product.titulo}</h2>
        <p className={styles.author}>{product.autor}</p>
        <p className={styles.description}>{product.descripcion}</p>
      </div>

      <div className={styles.footer}>
        <div>
          <span className={styles.price}>{formatPrice(product.precio)}</span>
          <span className={styles.stock}>Stock: {product.stock}</span>
        </div>
        <Link className={styles.detailLink} to={`/producto/${product.id}`}>
          <ShoppingBag size={18} aria-hidden="true" />
          Ver
        </Link>
      </div>
    </article>
  );
}

export default Item;

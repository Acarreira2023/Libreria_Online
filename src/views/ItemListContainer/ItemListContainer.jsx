import { useEffect, useState } from 'react';
import Item from '../../components/Item/Item.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import { getProducts } from '../../services/products.js';
import styles from './ItemListContainer.module.css';

function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setError('');

    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <LoadingSpinner label="Cargando catalogo..." />;
  }

  if (error) {
    return <p className="feedback error">{error}</p>;
  }

  return (
    <section className={styles.catalog}>
      <div className={styles.heading}>
        <span>Catalogo</span>
        <h1>Libros disponibles</h1>
        <p>Elegir, revisar el detalle y agregar al carrito sin recargar la pagina.</p>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <Item product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}

export default ItemListContainer;

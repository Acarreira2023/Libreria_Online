import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Item from '../../components/Item/Item.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import { getProducts } from '../../services/products.js';
import styles from './ItemListContainer.module.css';

const allCategories = 'Todos';

function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('categoria') ?? allCategories;

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

  const categories = [
    allCategories,
    ...new Set(products.map((product) => product.categoria)),
  ];
  const visibleCategory = categories.includes(selectedCategory)
    ? selectedCategory
    : allCategories;
  const filteredProducts =
    visibleCategory === allCategories
      ? products
      : products.filter((product) => product.categoria === visibleCategory);

  const handleCategoryChange = (category) => {
    if (category === allCategories) {
      setSearchParams({});
      return;
    }

    setSearchParams({ categoria: category });
  };

  return (
    <section className={styles.catalog}>
      <div className={styles.heading}>
        <span>Catalogo</span>
        <h1>Libros disponibles</h1>
        <p>
          Recorre el catalogo por categoria, revisa el detalle de cada libro y
          agrega tus favoritos al carrito.
        </p>
      </div>

      <div className={styles.filters} aria-label="Filtrar por categoria">
        {categories.map((category) => (
          <button
            className={visibleCategory === category ? styles.activeFilter : ''}
            type="button"
            key={category}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.resultCount}>
        {filteredProducts.length} libro(s) en {visibleCategory.toLowerCase()}
      </div>

      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <Item product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}

export default ItemListContainer;

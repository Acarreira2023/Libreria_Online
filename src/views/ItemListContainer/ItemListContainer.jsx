import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, InputGroup, Pagination, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { FaSearch, FaBookOpen } from 'react-icons/fa';
import Item from '../../components/Item/Item.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import { getProducts } from '../../services/products.js';
import styles from './ItemListContainer.module.css';

const allCategories = 'Todos';
const itemsPerPage = 6;

function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('categoria') ?? allCategories;

  // Search and Pagination States
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    setError('');

    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  if (isLoading) {
    return <LoadingSpinner label="Cargando catálogo..." />;
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Categories extraction
  const categories = [
    allCategories,
    ...new Set(products.map((product) => product.categoria)),
  ];

  const visibleCategory = categories.includes(selectedCategory)
    ? selectedCategory
    : allCategories;

  // Filter logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory = visibleCategory === allCategories || product.categoria === visibleCategory;
    const matchesSearch =
      product.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.autor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleCategoryChange = (category) => {
    if (category === allCategories) {
      setSearchParams({});
      return;
    }
    setSearchParams({ categoria: category });
  };

  // Pagination Buttons
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Container className="py-4">
      <Helmet>
        <title>Libros Disponibles | Librería Online</title>
        <meta name="description" content="Recorre nuestro catálogo completo de libros de programación, suspenso, espiritualidad y terror." />
      </Helmet>

      <section className={styles.catalog}>
        <div className="text-center mb-5">
          <span className="text-uppercase text-primary fw-bold tracking-wider">Catálogo</span>
          <h1 className="display-5 fw-bold mt-1">Libros disponibles</h1>
          <p className="text-muted max-w-2xl mx-auto">
            Recorre el catálogo por categoría, busca por título o autor y encuentra tu próxima lectura ideal.
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <Row className="mb-4 align-items-center">
          <Col md={6} className="mb-3 mb-md-0">
            <div className="d-flex flex-wrap gap-2 align-items-center" aria-label="Filtrar por categoría">
              {categories.map((category) => (
                <button
                  className={`${styles.filterBtn} ${visibleCategory === category ? styles.activeFilter : ''}`}
                  type="button"
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </Col>
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                className="border-start-0 ps-0"
                type="text"
                placeholder="Buscar por título o autor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="text-muted small">
            {filteredProducts.length} libro(s) encontrado(s) en {visibleCategory.toLowerCase()}
          </span>
        </div>

        {currentProducts.length === 0 ? (
          <Alert variant="warning" className="text-center my-5">
            <FaBookOpen className="mb-2 fs-3" /><br />
            No encontramos libros que coincidan con tu búsqueda.
          </Alert>
        ) : (
          <>
            <Row className="g-4">
              {currentProducts.map((product) => (
                <Col key={product.id} xs={12} sm={6} md={4} className="d-flex">
                  <div className="w-100 d-flex">
                    <Item product={product} />
                  </div>
                </Col>
              ))}
            </Row>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination>{paginationItems}</Pagination>
              </div>
            )}
          </>
        )}
      </section>
    </Container>
  );
}

export default ItemListContainer;

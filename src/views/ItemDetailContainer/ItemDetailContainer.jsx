import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { FaShoppingCart, FaHeart, FaCheckCircle, FaChevronLeft } from 'react-icons/fa';
import ItemCount from '../../components/ItemCount/ItemCount.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import { useCarrito } from '../../context/CarritoContext.jsx';
import { getProductById } from '../../services/products.js';
import { formatPrice, getFinalPrice, hasOffer } from '../../utils/formatPrice.js';
import styled from 'styled-components';

const DetailContainer = styled(Container)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CoverImage = styled.img`
  width: 100%;
  max-width: 380px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  display: block;
  margin: 0 auto;
`;

const BookCategory = styled.span`
  background-color: #f1faee;
  color: #e63946;
  font-weight: bold;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  display: inline-block;
  margin-bottom: 15px;
`;

const BookPrice = styled.span`
  font-size: 2rem;
  font-weight: 800;
  color: #1d3557;
`;

const OriginalPrice = styled.span`
  color: #8a939b;
  font-size: 1rem;
  text-decoration: line-through;
`;

const OfferBadge = styled.span`
  display: inline-flex;
  width: fit-content;
  border-radius: 999px;
  background: #e63946;
  color: #ffffff;
  font-size: 0.86rem;
  font-weight: 800;
  padding: 5px 12px;
`;

const FavoriteButton = styled(Button)`
  border-color: ${props => props.$isFavorite ? '#e63946' : '#cccccc'};
  background-color: ${props => props.$isFavorite ? '#e63946' : 'transparent'};
  color: ${props => props.$isFavorite ? '#ffffff' : '#333333'};
  
  &:hover {
    background-color: #e63946;
    border-color: #e63946;
    color: white;
  }
`;

function ItemDetailContainer() {
  const { id } = useParams();
  const { agregarAlCarrito, obtenerCantidadItem } = useCarrito();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Clase 6: Manejo del estado de carga (loading/adding) para deshabilitar botón dinámico
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
    return <LoadingSpinner label="Cargando detalle del libro..." />;
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger" className="d-inline-block p-4">
          <p className="mb-3">{error}</p>
          <Link to="/productos" className="btn btn-primary d-inline-flex align-items-center gap-2">
            <FaChevronLeft /> Volver al catálogo
          </Link>
        </Alert>
      </Container>
    );
  }

  const quantityInCart = obtenerCantidadItem(product.id);
  const availableStock = product.stock - quantityInCart;
  const hasStock = availableStock > 0;
  const isOnSale = hasOffer(product);
  const finalPrice = getFinalPrice(product);

  const handleAddToCart = () => {
    setIsAdding(true);
    setMessage('');

    // Simula una llamada asincrónica / retardo de red
    window.setTimeout(() => {
      agregarAlCarrito(product, quantity);
      setMessage(`${quantity} libro(s) agregado(s) al carrito.`);
      setQuantity(1);
      setIsAdding(false);
    }, 600);
  };

  return (
    <Container className="py-4">
      {product && (
        <Helmet>
          <title>{product.titulo} - Detalle | Librería Online</title>
          <meta name="description" content={`Detalle completo del libro ${product.titulo} de ${product.autor}. Categoria: ${product.categoria}.`} />
        </Helmet>
      )}

      <Link to="/productos" className="btn btn-outline-secondary mb-4 d-inline-flex align-items-center gap-2">
        <FaChevronLeft /> Volver al catálogo
      </Link>

      <DetailContainer>
        <Row className="align-items-center">
          <Col md={5} className="mb-4 mb-md-0">
            <CoverImage src={product.imagen} alt={`Tapa de ${product.titulo}`} />
          </Col>

          <Col md={7}>
            <div className="ps-md-4">
              <BookCategory>{product.categoria}</BookCategory>
              <h1 className="display-6 fw-bold mb-1 text-dark">{product.titulo}</h1>
              <p className="text-muted fs-5 mb-4">Por <strong>{product.autor}</strong></p>
              
              <p className="lead fs-6 text-muted lh-base mb-4">{product.descripcion}</p>

              <div className="bg-light p-4 rounded-3 mb-4">
                <Row className="align-items-center">
                  <Col xs={6}>
                    <div className="text-muted small">Precio</div>
                    <div className="d-flex flex-column align-items-start gap-1">
                      {isOnSale && (
                        <>
                          <OfferBadge>{product.descuento}% OFF</OfferBadge>
                          <OriginalPrice>{formatPrice(product.precio)}</OriginalPrice>
                        </>
                      )}
                      <BookPrice>{formatPrice(finalPrice)}</BookPrice>
                    </div>
                  </Col>
                  <Col xs={6} className="text-end">
                    <span className={`badge ${hasStock ? 'bg-success' : 'bg-danger'} fs-6`}>
                      {hasStock ? `Stock: ${availableStock}` : 'Sin stock'}
                    </span>
                  </Col>
                </Row>

                <div className="mt-4">
                  <div className="text-muted small mb-2">Cantidad a comprar</div>
                  <ItemCount
                    quantity={quantity}
                    stock={Math.max(availableStock, 1)}
                    disabled={!hasStock || isAdding}
                    onAdd={() => setQuantity((current) => Math.min(current + 1, availableStock))}
                    onSubtract={() => setQuantity((current) => Math.max(current - 1, 1))}
                  />
                </div>

                <div className="d-flex flex-wrap gap-2 mt-4">
                  {/* Clase 6: Botón de envío dinámico que se deshabilita y cambia texto cuando isAdding (loading) es true */}
                  <Button
                    className="flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-2"
                    variant="primary"
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!hasStock || isAdding}
                    style={{ backgroundColor: '#1d3557', borderColor: '#1d3557' }}
                  >
                    {isAdding ? (
                      <>
                        <Spinner size="sm" animation="border" /> Agregando...
                      </>
                    ) : (
                      <>
                        <FaShoppingCart /> Agregar al carrito
                      </>
                    )}
                  </Button>

                  <FavoriteButton
                    $isFavorite={isFavorite}
                    onClick={() => setIsFavorite((current) => !current)}
                    className="d-flex align-items-center gap-2"
                  >
                    <FaHeart /> Favorito
                  </FavoriteButton>
                </div>

                {message && (
                  <Alert variant="success" className="mt-3 py-2 px-3 d-flex align-items-center gap-2 mb-0">
                    <FaCheckCircle className="text-success" />
                    <span className="small">{message}</span>
                  </Alert>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </DetailContainer>
    </Container>
  );
}

export default ItemDetailContainer;

import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import { formatPrice, getFinalPrice, hasOffer } from '../../utils/formatPrice.js';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.25s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.25s ease;
  overflow: hidden;
  position: relative;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const CoverContainer = styled.div`
  height: 200px;
  overflow: hidden;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;

const CoverImage = styled.img`
  width: auto;
  height: 100%;
  max-width: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  ${StyledCard}:hover & {
    transform: scale(1.04);
  }
`;

const FavoriteBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.$isFavorite ? '#e63946' : '#a8dadc'};
  transition: color 0.2s ease, transform 0.2s ease;
  z-index: 5;
  
  &:hover {
    transform: scale(1.1);
    color: #e63946;
  }
`;

const OfferBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 5;
  border-radius: 999px;
  background: #e63946;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 800;
  padding: 5px 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
`;

const BookCategory = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: bold;
  color: #1d3557;
  letter-spacing: 0.8px;
`;

const BookTitle = styled(Card.Title)`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 6px 0 2px;
  color: #1d3557;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BookAuthor = styled.p`
  font-size: 0.85rem;
  color: #457b9d;
  margin-bottom: 12px;
`;

const BookDesc = styled(Card.Text)`
  font-size: 0.85rem;
  color: #6c757d;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 3.6em;
`;

const OriginalPrice = styled.span`
  color: #8a939b;
  font-size: 0.8rem;
  text-decoration: line-through;
`;

function Item({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const isOnSale = hasOffer(product);
  const finalPrice = getFinalPrice(product);

  // Clase 4: Función marcarComoFavorito que alterna un booleano usando useState
  const marcarComoFavorito = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  return (
    <StyledCard>
      {isOnSale && <OfferBadge>{product.descuento}% OFF</OfferBadge>}

      <FavoriteBtn
        $isFavorite={isFavorite}
        onClick={marcarComoFavorito}
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
      >
        <FaHeart size={16} />
      </FavoriteBtn>

      <CoverContainer>
        <CoverImage src={product.imagen} alt={`Tapa de ${product.titulo}`} />
      </CoverContainer>

      <Card.Body className="d-flex flex-column p-3">
        <BookCategory>{product.categoria}</BookCategory>
        <BookTitle>{product.titulo}</BookTitle>
        <BookAuthor>Por {product.autor}</BookAuthor>
        <BookDesc>{product.descripcion}</BookDesc>

        <div className="mt-auto d-flex justify-content-between align-items-center pt-3 border-top border-light">
          <div className="d-flex flex-column">
            {isOnSale && <OriginalPrice>{formatPrice(product.precio)}</OriginalPrice>}
            <span className="fw-bold text-dark fs-5">{formatPrice(finalPrice)}</span>
            <span className="text-muted small">Stock: {product.stock}</span>
          </div>
          <Link to={`/producto/${product.id}`} className="text-decoration-none">
            <Button
              variant="primary"
              size="sm"
              className="d-flex align-items-center gap-1"
              style={{ backgroundColor: '#1d3557', borderColor: '#1d3557' }}
            >
              <FaShoppingBag size={14} /> Ver
            </Button>
          </Link>
        </div>
      </Card.Body>
    </StyledCard>
  );
}

export default Item;

import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import { formatPrice } from '../../utils/formatPrice.js';
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
  height: 260px;
  overflow: hidden;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${StyledCard}:hover & {
    transform: scale(1.05);
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

function Item({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Clase 4: Función marcarComoFavorito que alterna un booleano usando useState
  const marcarComoFavorito = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  return (
    <StyledCard>
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
            <span className="fw-bold text-dark fs-5">{formatPrice(product.precio)}</span>
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

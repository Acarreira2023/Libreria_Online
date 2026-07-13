import { Card } from 'react-bootstrap';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const EmojiHeader = styled.div`
  font-size: 2.5rem;
  text-align: center;
  padding: 15px 0 5px;
`;

function Asistente({ nombre, tarea, emoji }) {
  return (
    <StyledCard className="text-center h-100">
      <EmojiHeader>{emoji}</EmojiHeader>
      <Card.Body>
        <Card.Title className="h5 mb-2">{nombre}</Card.Title>
        <Card.Text className="text-muted small">
          <strong>Asignación:</strong> {tarea}
        </Card.Text>
      </Card.Body>
    </StyledCard>
  );
}

export default Asistente;

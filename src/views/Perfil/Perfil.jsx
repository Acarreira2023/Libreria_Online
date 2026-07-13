import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaUser, FaSignOutAlt, FaTools, FaBookOpen } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  color: white;
  padding: 40px 20px;
  text-align: center;
`;

const AvatarContainer = styled.div`
  width: 90px;
  height: 90px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  border: 3px solid rgba(255, 255, 255, 0.4);
`;

function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return (
    <Container className="py-5">
      <Helmet>
        <title>Mi Perfil | Librería Online</title>
        <meta name="description" content="Gestiona tu información de usuario y accede al panel de administración del eCommerce." />
      </Helmet>

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <StyledCard>
            <ProfileHeader>
              <AvatarContainer>
                <FaUser size={45} />
              </AvatarContainer>
              <h1 className="h4 mb-1">Mi Perfil</h1>
              <p className="mb-0 text-white-50">{user?.email}</p>
            </ProfileHeader>

            <Card.Body className="p-4">
              <h5 className="mb-3 text-muted">Datos de la Cuenta</h5>
              <ListGroup className="mb-4">
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                  <span><strong>ID de Usuario (UID):</strong></span>
                  <span className="text-truncate text-muted ms-2" style={{ maxWidth: '250px' }}>
                    {user?.uid}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                  <span><strong>Email Registrado:</strong></span>
                  <span className="text-muted">{user?.email}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                  <span><strong>Rol asignado:</strong></span>
                  <span className="badge bg-success">Administrador</span>
                </ListGroup.Item>
              </ListGroup>

              <div className="d-flex flex-column gap-2">
                <Link to="/admin" className="text-decoration-none">
                  <Button
                    variant="outline-primary"
                    className="w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaTools /> Panel de Administración (CRUD)
                  </Button>
                </Link>

                <Link to="/productos" className="text-decoration-none">
                  <Button
                    variant="outline-secondary"
                    className="w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaBookOpen /> Ir al Catálogo de Libros
                  </Button>
                </Link>

                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="w-100 py-2 mt-3 d-flex align-items-center justify-content-center gap-2"
                >
                  <FaSignOutAlt /> Cerrar Sesión
                </Button>
              </div>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>
    </Container>
  );
}

export default Perfil;

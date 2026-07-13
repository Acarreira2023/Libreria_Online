import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaCode, FaGhost, FaHeart, FaClock, FaBrain, FaStar, FaArrowRight, FaBookOpen } from 'react-icons/fa';
import styled from 'styled-components';

const HeroSection = styled.div`
  background: linear-gradient(135deg, #1d3557 0%, #457b9d 100%);
  color: white;
  padding: 80px 0;
  border-radius: 16px;
  margin-top: 20px;
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(29, 53, 87, 0.15);
  overflow: hidden;
  position: relative;
`;

const CategoryCard = styled(Card)`
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
  transition: transform 0.25s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.25s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  }
`;

const IconContainer = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 12px;
  background-color: #f1faee;
  color: #e63946;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const categories = [
  { name: 'Tecnico', icon: FaCode, description: 'Programación, desarrollo web y herramientas de software.' },
  { name: 'Terror', icon: FaGhost, description: 'Historias oscuras, misterios siniestros y tensión psicológica.' },
  { name: 'Romantico', icon: FaHeart, description: 'Novelas sentimentales, encuentros mágicos y emociones intensas.' },
  { name: 'Suspenso', icon: FaClock, description: 'Thrillers policíacos, crímenes complejos e intriga continua.' },
  { name: 'Metafisico', icon: FaBrain, description: 'Filosofía, la mente humana, energía y auto-descubrimiento.' },
  { name: 'Espiritual', icon: FaStar, description: 'Calma, propósito de vida, meditación y bienestar integral.' },
];

function Home() {
  return (
    <Container className="py-4">
      <Helmet>
        <title>Inicio | Librería Online</title>
        <meta name="description" content="Bienvenido a la Librería Online. Explora nuestro catálogo de libros técnicos, novelas, misterio, terror y lecturas espirituales." />
      </Helmet>

      {/* Hero Header */}
      <HeroSection className="px-4 px-md-5">
        <Row className="align-items-center">
          <Col md={8} lg={7} className="text-center text-md-start">
            <span className="badge bg-warning text-dark mb-3 px-3 py-2 text-uppercase fw-bold">Selección Editorial 2026</span>
            <h1 className="display-4 fw-bold mb-3">Librería Online</h1>
            <p className="lead mb-4 text-white-50">
              Encuentra libros de desarrollo técnico, novelas atrapantes, misterio y lecturas de desarrollo personal en nuestro catálogo en línea.
            </p>
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3">
              <Link to="/productos" className="text-decoration-none">
                <Button variant="light" size="lg" className="d-flex align-items-center gap-2 fw-bold text-primary py-3 px-4">
                  Explorar Catálogo <FaArrowRight />
                </Button>
              </Link>
              <Link to="/nosotros" className="text-decoration-none">
                <Button variant="outline-light" size="lg" className="py-3 px-4">
                  Quiénes Somos
                </Button>
              </Link>
            </div>
          </Col>
          <Col md={4} lg={5} className="d-none d-md-flex justify-content-center">
            <FaBookOpen size={180} className="text-white-50 opacity-50" />
          </Col>
        </Row>
      </HeroSection>

      {/* Categories Grid */}
      <section className="my-5">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold text-dark">¿Qué te gustaría leer hoy?</h2>
          <p className="text-muted">Elige una de nuestras categorías destacadas y encuentra tu próximo libro preferido</p>
        </div>

        <Row className="g-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Col key={category.name} xs={12} sm={6} md={4} className="d-flex">
                <Link to={`/productos?categoria=${category.name}`} className="text-decoration-none w-100 d-flex">
                  <CategoryCard className="w-100 p-4">
                    <Card.Body className="p-0 d-flex flex-column">
                      <IconContainer>
                        <Icon />
                      </IconContainer>
                      <Card.Title className="h5 fw-bold text-dark mb-2">{category.name}</Card.Title>
                      <Card.Text className="text-muted small lh-base">{category.description}</Card.Text>
                    </Card.Body>
                  </CategoryCard>
                </Link>
              </Col>
            );
          })}
        </Row>
      </section>
    </Container>
  );
}

export default Home;

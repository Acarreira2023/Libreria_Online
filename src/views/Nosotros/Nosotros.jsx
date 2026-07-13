import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUsers, FaHistory } from 'react-icons/fa';
import Asistente from '../../components/Asistente/Asistente.jsx';
import styled from 'styled-components';

const HeaderBanner = styled.div`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 50px 20px;
  border-radius: 8px;
  margin-bottom: 40px;
  text-align: center;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  
  svg {
    color: #1e3c72;
    font-size: 1.2rem;
  }
`;

const assistantsData = [
  { nombre: "Prof. Alejandro", tarea: "Diseño de Clases y Mentorship", emoji: "👨‍🏫" },
  { nombre: "Tutor Gastón", tarea: "Evaluación de Entregables y Código", emoji: "💻" },
  { nombre: "Tutora Sofía", tarea: "Soporte de Consultas Técnicas", emoji: "🚀" }
];

function Nosotros() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    fetch('/data/nosotros.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('No se pudo cargar la información institucional.');
        }
        return res.json();
      })
      .then((jsonData) => setData(jsonData))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container className="py-4">
      <Helmet>
        <title>Nosotros | Librería Online</title>
        <meta name="description" content="Conoce la historia de la Librería Online, nuestro equipo de soporte y la información de contacto oficial." />
      </Helmet>

      <HeaderBanner>
        <h1 className="display-5 fw-bold mb-2">Sobre Nosotros</h1>
        <p className="lead mb-0">Conoce al equipo detrás de la Librería Online</p>
      </HeaderBanner>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" className="mb-2" />
          <p className="text-muted">Cargando datos institucionales...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <>
          <Row className="mb-5">
            <Col lg={7} className="mb-4 mb-lg-0">
              <Card className="h-100 border-0 shadow-sm p-4">
                <Card.Body>
                  <h2 className="h3 mb-3 d-flex align-items-center gap-2">
                    <FaHistory /> Nuestra Misión
                  </h2>
                  <p className="text-muted lead fs-6">{data?.descripcion}</p>
                  
                  <h3 className="h5 mt-4 mb-3">Nuestros Valores</h3>
                  <Row>
                    {data?.valores.map((valor, idx) => (
                      <Col sm={6} key={idx} className="mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-success fw-bold">✓</span>
                          <span className="text-muted small">{valor}</span>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="h-100 border-0 shadow-sm p-4">
                <Card.Body>
                  <h2 className="h3 mb-4">Información de Contacto</h2>
                  <ContactItem>
                    <FaMapMarkerAlt />
                    <div>
                      <div className="fw-bold">Dirección</div>
                      <div className="text-muted small">{data?.direccion}</div>
                    </div>
                  </ContactItem>
                  <ContactItem>
                    <FaPhone />
                    <div>
                      <div className="fw-bold">Teléfono</div>
                      <div className="text-muted small">{data?.telefono}</div>
                    </div>
                  </ContactItem>
                  <ContactItem>
                    <FaEnvelope />
                    <div>
                      <div className="fw-bold">Email</div>
                      <div className="text-muted small">{data?.email}</div>
                    </div>
                  </ContactItem>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <section className="mt-5">
            <h2 className="h3 mb-4 text-center d-flex align-items-center justify-content-center gap-2">
              <FaUsers /> Nuestro Staff de Asistencia (Clase 2)
            </h2>
            <p className="text-center text-muted mb-4">
              Te presentamos a los asistentes pedagógicos encargados de guiar el desarrollo de este proyecto.
            </p>
            <Row>
              {assistantsData.map((asistente, idx) => (
                <Col md={4} key={idx} className="mb-4">
                  <Asistente
                    nombre={asistente.nombre}
                    tarea={asistente.tarea}
                    emoji={asistente.emoji}
                  />
                </Col>
              ))}
            </Row>
          </section>
        </>
      )}
    </Container>
  );
}

export default Nosotros;

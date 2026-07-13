import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase.js';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FaInstagram, FaFacebook, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  const [equipo, setEquipo] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const obtenerEquipo = async () => {
      try {
        const colRef = collection(db, 'equipo');
        const querySnapshot = await getDocs(colRef);
        const list = querySnapshot.docs.map((doc) => doc.data());
        setEquipo(list);
      } catch (err) {
        console.error('Error al obtener el equipo del footer:', err);
      }
    };

    obtenerEquipo();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Barra de Redes Sociales (Top) */}
      <div className={styles.socialBar}>
        <Container className="d-flex justify-content-center gap-4">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Instagram"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Facebook"
          >
            <FaFacebook size={18} />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="YouTube"
          >
            <FaYoutube size={18} />
          </a>
        </Container>
      </div>

      {/* Contenido Principal del Footer */}
      <Container className="py-5">
        <Row className="gy-4">
          {/* Columna 1: Librería Online */}
          <Col xs={12} sm={6} md={3}>
            <h5 className="text-uppercase fw-bold mb-3 text-white small">Librería Online</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/nosotros" className="text-white-50 text-decoration-none small">
                  Nosotros
                </Link>
              </li>
              <li className="mb-2">
                <a href="#sucursales" className="text-white-50 text-decoration-none small">
                  Sucursales
                </a>
              </li>
              <li className="mb-2">
                <a href="#retiro" className="text-white-50 text-decoration-none small">
                  Retiro en Sucursales
                </a>
              </li>
              <li className="mb-2">
                <a href="#ebooks" className="text-white-50 text-decoration-none small">
                  eBooks y Audiolibros
                </a>
              </li>
            </ul>
          </Col>

          {/* Columna 2: Ayuda */}
          <Col xs={12} sm={6} md={3}>
            <h5 className="text-uppercase fw-bold mb-3 text-white small">Ayuda</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#envios" className="text-white-50 text-decoration-none small">
                  Métodos de Envío
                </a>
              </li>
              <li className="mb-2">
                <a href="#pagos" className="text-white-50 text-decoration-none small">
                  Medios de Pago
                </a>
              </li>
              <li className="mb-2">
                <a href="#promociones" className="text-white-50 text-decoration-none small">
                  Promociones Bancarias
                </a>
              </li>
              <li className="mb-2">
                <a href="#devoluciones" className="text-white-50 text-decoration-none small">
                  Cambios y Devoluciones
                </a>
              </li>
              <li className="mb-2">
                <a href="#preguntas" className="text-white-50 text-decoration-none small">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </Col>

          {/* Columna 3: Atención al Cliente */}
          <Col xs={12} sm={6} md={3}>
            <h5 className="text-uppercase fw-bold mb-3 text-white small">Atención al Cliente</h5>
            <ul className="list-unstyled text-white-50 small">
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaPhone size={12} />
                <span>0810-33-EXTRA (39872)</span>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaEnvelope size={12} />
                <a
                  href="mailto:contacto@libreriaonline.com"
                  className="text-white-50 text-decoration-none"
                >
                  contacto@libreriaonline.com
                </a>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaMapMarkerAlt size={12} />
                <span>Av. Corrientes 1234 - CABA</span>
              </li>
            </ul>
          </Col>

          {/* Columna 4: Newsletter */}
          <Col xs={12} sm={6} md={3}>
            <h5 className="text-uppercase fw-bold mb-3 text-white small">Newsletter</h5>
            {subscribed ? (
              <Alert variant="success" className="py-2 px-3 small">
                ¡Gracias por suscribirte!
              </Alert>
            ) : (
              <Form onSubmit={handleSubscribe} className="d-flex mb-3">
                <Form.Control
                  type="email"
                  placeholder="Ingresá tu email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-start border-0 text-dark"
                  style={{ fontSize: '0.85rem' }}
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="rounded-end px-3"
                  style={{
                    fontSize: '0.85rem',
                    backgroundColor: '#1d3557',
                    borderColor: '#1d3557',
                  }}
                >
                  ENVIAR
                </Button>
              </Form>
            )}
          </Col>
        </Row>

        {/* Lista Dinámica de Equipo (Clase 9) */}
        {equipo.length > 0 && (
          <Row className="mt-5 pt-4 border-top border-secondary">
            <Col className="text-center">
              <h6 className="text-uppercase small text-white-50 mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.8px' }}>
                Nuestro Equipo de Soporte (Firebase/Firestore)
              </h6>
              <div className="d-flex justify-content-center flex-wrap gap-3 small text-white-50">
                {equipo.map((miembro, idx) => (
                  <span key={idx} className="small">
                    {miembro.emoji} <strong>{miembro.nombre}</strong> - {miembro.rol}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        )}

        <div className="text-center text-white-50 small mt-4 pt-3" style={{ fontSize: '0.7rem' }}>
          © {new Date().getFullYear()} Librería Online. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
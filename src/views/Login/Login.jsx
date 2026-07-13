import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaSignInAlt, FaUserPlus, FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  border: none;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  background: #ffffff;
`;

const HeaderBanner = styled.div`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 30px 20px;
  text-align: center;
`;

function Login() {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to redirect Path or home
  const from = location.state?.from?.pathname || '/perfil';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Validations
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        await register(email, password);
        setSuccessMsg('¡Usuario registrado con éxito! Redirigiendo...');
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1500);
      } else {
        await login(email, password);
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('El correo electrónico ya está registrado.');
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Credenciales inválidas. Revisa tu correo y contraseña.');
      } else if (err.code === 'auth/invalid-email') {
        setError('El formato del correo electrónico no es válido.');
      } else {
        setError('Ocurrió un error al procesar tu solicitud. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Helmet>
        <title>{isRegister ? 'Registro | Librería Online' : 'Iniciar Sesión | Librería Online'}</title>
        <meta name="description" content="Inicia sesión o regístrate en nuestra Librería Online para gestionar tu carrito y tus compras." />
      </Helmet>

      <Row className="justify-content-center">
        <Col md={8} lg={5}>
          <StyledCard>
            <HeaderBanner>
              <h1 className="h3 mb-1">Librería Online</h1>
              <p className="mb-0 small">
                {isRegister ? 'Crea una cuenta para comenzar' : 'Accede a tu cuenta de cliente'}
              </p>
            </HeaderBanner>

            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}
              {successMsg && <Alert variant="success">{successMsg}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label className="d-flex align-items-center gap-2">
                    <FaEnvelope /> Correo electrónico
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label className="d-flex align-items-center gap-2">
                    <FaLock /> Contraseña
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </Form.Group>

                {isRegister && (
                  <Form.Group className="mb-4" controlId="loginConfirmPassword">
                    <Form.Label className="d-flex align-items-center gap-2">
                      <FaLock /> Confirmar Contraseña
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Repite la contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required={isRegister}
                      disabled={loading}
                    />
                  </Form.Group>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2 d-flex align-items-center justify-content-center gap-2 mb-3"
                  disabled={loading}
                  style={{ backgroundColor: '#1e3c72', borderColor: '#1e3c72' }}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" animation="border" /> Procesando...
                    </>
                  ) : isRegister ? (
                    <>
                      <FaUserPlus /> Registrarme
                    </>
                  ) : (
                    <>
                      <FaSignInAlt /> Iniciar Sesión
                    </>
                  )}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Button
                  variant="link"
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setError('');
                    setSuccessMsg('');
                  }}
                  className="text-decoration-none text-muted p-0"
                  disabled={loading}
                >
                  {isRegister
                    ? '¿Ya tienes una cuenta? Inicia sesión'
                    : '¿No tienes una cuenta? Regístrate aquí'}
                </Button>
              </div>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;

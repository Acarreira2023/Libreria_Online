import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { FaUser, FaInfoCircle, FaBook, FaTools } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import CartWidget from '../CartWidget/CartWidget.jsx';
import styles from './NavBar.module.css';

function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light" className="py-2 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <span className="fw-bold text-primary">Librería Online</span>
        </Navbar.Brand>

        {/* Botón Mi Perfil / Ingresar siempre visible */}
        <div className="d-flex align-items-center gap-2 ms-auto me-2">
          <Nav.Link as={NavLink} to="/carrito" className="pe-1 d-md-none">
            <CartWidget />
          </Nav.Link>
          {user ? (
            <Nav.Link as={NavLink} to="/perfil" className="d-flex align-items-center gap-1 btn btn-primary text-white px-3 py-1 rounded">
              <FaUser size={14} /> Mi Perfil
            </Nav.Link>
          ) : (
            <Nav.Link as={NavLink} to="/login" className="btn btn-outline-primary px-3 py-1 rounded">
              Ingresar
            </Nav.Link>
          )}
        </div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto align-items-center">
            <Nav.Link as={NavLink} to="/" end className="px-3">
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos" className="px-3">
              <FaBook className="me-1" /> Libros
            </Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros" className="px-3">
              <FaInfoCircle className="me-1" /> Nosotros
            </Nav.Link>
            {user && (
              <Nav.Link as={NavLink} to="/admin" className="px-3 text-warning-emphasis">
                <FaTools className="me-1" /> Admin
              </Nav.Link>
            )}
          </Nav>

          <Nav className="align-items-center gap-2 d-none d-md-flex">
            <Nav.Link as={NavLink} to="/carrito" className="pe-3">
              <CartWidget />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;


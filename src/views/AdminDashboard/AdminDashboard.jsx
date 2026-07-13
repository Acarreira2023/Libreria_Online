import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Modal, Alert, Spinner, Tabs, Tab, Badge } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { FaPlus, FaTrash, FaEdit, FaDatabase, FaTicketAlt, FaBook, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { db } from '../../services/firebase.js';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { seedDatabase } from '../../utils/seed.js';
import styled from 'styled-components';

const AdminHeader = styled.div`
  background: linear-gradient(135deg, #343a40 0%, #212529 100%);
  color: white;
  padding: 30px 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
`;

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Product Form State
  const [showProductModal, setShowProductModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [prodTitle, setProdTitle] = useState('');
  const [prodAuthor, setProdAuthor] = useState('');
  const [prodCategory, setProdCategory] = useState('Tecnico');
  const [prodPrice, setProdPrice] = useState('');
  const [prodStock, setProdStock] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodDesc, setProdDesc] = useState('');

  // Delete Confirm Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, title, type: 'product' | 'coupon' }

  // Coupon Form State
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState('');

  // Seeding State
  const [seeding, setSeeding] = useState(false);

  // Fetch Firestore Data
  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Products
      const prodCol = collection(db, 'libros');
      const prodSnapshot = await getDocs(prodCol);
      const prodList = prodSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(prodList);

      // Coupons
      const couponCol = collection(db, 'cupones');
      const couponSnapshot = await getDocs(couponCol);
      const couponList = couponSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCoupons(couponList);
    } catch (err) {
      console.error(err);
      setError('Error al obtener datos de Firestore. Asegúrate de configurar .env y tener conectividad.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Form validations & Submit
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validations
    if (!prodTitle.trim() || !prodAuthor.trim() || !prodImage.trim() || !prodDesc.trim()) {
      setError('Por favor, completa todos los campos del libro.');
      return;
    }

    const priceNum = parseFloat(prodPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('El precio debe ser un número mayor a 0.');
      return;
    }

    const stockNum = parseInt(prodStock);
    if (isNaN(stockNum) || stockNum < 0) {
      setError('El stock debe ser un número mayor o igual a 0.');
      return;
    }

    const bookData = {
      titulo: prodTitle.trim(),
      autor: prodAuthor.trim(),
      categoria: prodCategory,
      precio: priceNum,
      stock: stockNum,
      imagen: prodImage.trim(),
      descripcion: prodDesc.trim(),
    };

    setIsLoading(true);
    try {
      if (isEditing) {
        const docRef = doc(db, 'libros', editingId);
        await updateDoc(docRef, bookData);
        setSuccess('Libro actualizado exitosamente.');
      } else {
        await addDoc(collection(db, 'libros'), bookData);
        setSuccess('Libro creado exitosamente.');
      }
      setShowProductModal(false);
      resetProductForm();
      await fetchData();
    } catch (err) {
      console.error(err);
      setError('Error al guardar el producto en la base de datos.');
      setIsLoading(false);
    }
  };

  const resetProductForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setProdTitle('');
    setProdAuthor('');
    setProdCategory('Tecnico');
    setProdPrice('');
    setProdStock('');
    setProdImage('');
    setProdDesc('');
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditingId(product.id);
    setProdTitle(product.titulo);
    setProdAuthor(product.autor);
    setProdCategory(product.categoria || 'Tecnico');
    setProdPrice(product.precio);
    setProdStock(product.stock);
    setProdImage(product.imagen);
    setProdDesc(product.descripcion);
    setShowProductModal(true);
  };

  // Delete flow
  const initiateDelete = (id, name, type) => {
    setDeleteTarget({ id, name, type });
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setIsLoading(true);
    setShowConfirmModal(false);
    setError('');
    setSuccess('');

    try {
      if (deleteTarget.type === 'product') {
        await deleteDoc(doc(db, 'libros', deleteTarget.id));
        setSuccess(`El libro "${deleteTarget.name}" fue eliminado.`);
      } else if (deleteTarget.type === 'coupon') {
        await deleteDoc(doc(db, 'cupones', deleteTarget.id));
        setSuccess(`El cupón "${deleteTarget.name}" fue eliminado.`);
      }
      setDeleteTarget(null);
      await fetchData();
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al intentar eliminar el documento.');
      setIsLoading(false);
    }
  };

  // Add Coupon
  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const code = couponCode.trim().toUpperCase();
    const discount = parseInt(couponDiscount);

    if (!code) {
      setError('El código del cupón es obligatorio.');
      return;
    }

    if (isNaN(discount) || discount < 1 || discount > 100) {
      setError('El descuento debe ser un porcentaje entre 1 y 100.');
      return;
    }

    setIsLoading(true);
    try {
      await addDoc(collection(db, 'cupones'), {
        codigo: code,
        descuento: discount,
      });
      setSuccess(`Cupón "${code}" agregado con éxito.`);
      setCouponCode('');
      setCouponDiscount('');
      await fetchData();
    } catch (err) {
      console.error(err);
      setError('Error al guardar el cupón.');
      setIsLoading(false);
    }
  };

  // Seed DB
  const handleSeed = async () => {
    const confirmed = window.confirm(
      'Esta accion cargara el catalogo inicial en la coleccion "libros" de Firestore. Si ya existen libros, no se duplicaran. ¿Deseas continuar?',
    );

    if (!confirmed) {
      return;
    }

    setError('');
    setSuccess('');
    setSeeding(true);
    try {
      const result = await seedDatabase();
      setSuccess(result.message || 'Base de datos inicializada exitosamente.');
      await fetchData();
    } catch (err) {
      console.error(err);
      setError('Error al poblar la base de datos de Firestore. Revisa las reglas de seguridad y variables de entorno.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <Container className="py-4">
      <Helmet>
        <title>Panel de Administración | Librería Online</title>
        <meta name="description" content="Panel de administración de la tienda. Gestiona libros y cupones de descuento." />
      </Helmet>

      <AdminHeader>
        <div>
          <h1 className="h2 mb-1">Panel de Control</h1>
          <p className="mb-0 text-white-50">Gestiona el inventario de la tienda y cupones de descuento</p>
        </div>
        <div className="d-flex gap-2">
          <Button
            variant="warning"
            onClick={handleSeed}
            disabled={seeding || isLoading}
            className="d-flex align-items-center gap-2"
          >
            <FaDatabase /> {seeding ? 'Importando...' : 'Cargar libros en Firebase'}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              resetProductForm();
              setShowProductModal(true);
            }}
            className="d-flex align-items-center gap-2"
          >
            <FaPlus /> Agregar Libro
          </Button>
        </div>
      </AdminHeader>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {isLoading && !seeding ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" className="mb-2" />
          <p className="text-muted">Procesando solicitud y actualizando datos...</p>
        </div>
      ) : (
        <Tabs defaultActiveKey="productos" id="admin-tabs" className="mb-4">
          <Tab
            eventKey="productos"
            title={
              <span className="d-flex align-items-center gap-2">
                <FaBook /> Catálogo de Libros <Badge bg="secondary">{products.length}</Badge>
              </span>
            }
          >
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <Table responsive hover className="align-middle mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>Libro</th>
                      <th>Autor</th>
                      <th>Categoría</th>
                      <th className="text-end">Precio</th>
                      <th className="text-center">Stock</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          No hay libros registrados. Utiliza el botón &quot;Cargar libros en Firebase&quot; para cargar el catalogo inicial.
                        </td>
                      </tr>
                    ) : (
                      products.map((prod) => (
                        <tr key={prod.id}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={prod.imagen}
                                alt={prod.titulo}
                                style={{ width: '40px', height: '55px', objectFit: 'cover', borderRadius: '4px' }}
                              />
                              <div>
                                <div className="fw-bold">{prod.titulo}</div>
                                <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: '250px' }}>
                                  {prod.descripcion}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>{prod.autor}</td>
                          <td>
                            <Badge bg="info" className="text-dark">
                              {prod.categoria}
                            </Badge>
                          </td>
                          <td className="text-end fw-semibold">${prod.precio.toLocaleString('es-AR')}</td>
                          <td className="text-center">
                            <Badge bg={prod.stock > 0 ? 'success' : 'danger'}>
                              {prod.stock} u.
                            </Badge>
                          </td>
                          <td className="text-center">
                            <div className="d-flex gap-2 justify-content-center">
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => handleEditClick(prod)}
                                title="Editar"
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => initiateDelete(prod.id, prod.titulo, 'product')}
                                title="Eliminar"
                              >
                                <FaTrash />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Tab>

          <Tab
            eventKey="cupones"
            title={
              <span className="d-flex align-items-center gap-2">
                <FaTicketAlt /> Cupones de Descuento <Badge bg="secondary">{coupons.length}</Badge>
              </span>
            }
          >
            <Row>
              <Col lg={4}>
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Body>
                    <Card.Title className="mb-3">Agregar Cupón</Card.Title>
                    <Form onSubmit={handleCouponSubmit}>
                      <Form.Group className="mb-3" controlId="couponCode">
                        <Form.Label>Código del Cupón</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ej: DESCUENTO10"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="couponDiscount">
                        <Form.Label>Porcentaje de Descuento (%)</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Ej: 15"
                          value={couponDiscount}
                          onChange={(e) => setCouponDiscount(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Button variant="success" type="submit" className="w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                        <FaPlus /> Crear Cupón
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={8}>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="p-0">
                    <Table responsive hover className="align-middle mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th>Código</th>
                          <th className="text-center">Descuento</th>
                          <th className="text-center">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coupons.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="text-center py-4 text-muted">
                              No hay cupones registrados.
                            </td>
                          </tr>
                        ) : (
                          coupons.map((coupon) => (
                            <tr key={coupon.id}>
                              <td className="fw-bold text-monospace">{coupon.codigo}</td>
                              <td className="text-center">
                                <Badge bg="warning" className="text-dark">
                                  {coupon.descuento}% OFF
                                </Badge>
                              </td>
                              <td className="text-center">
                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() => initiateDelete(coupon.id, coupon.codigo, 'coupon')}
                                >
                                  <FaTrash />
                                </Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      )}

      {/* Product Form Modal */}
      <Modal show={showProductModal} onHide={() => setShowProductModal(false)} size="lg">
        <Form onSubmit={handleProductSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? 'Editar Libro' : 'Nuevo Libro'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="prodTitle">
                  <Form.Label>Título del Libro *</Form.Label>
                  <Form.Control
                    type="text"
                    value={prodTitle}
                    onChange={(e) => setProdTitle(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="prodAuthor">
                  <Form.Label>Autor *</Form.Label>
                  <Form.Control
                    type="text"
                    value={prodAuthor}
                    onChange={(e) => setProdAuthor(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="prodCategory">
                  <Form.Label>Categoría *</Form.Label>
                  <Form.Select value={prodCategory} onChange={(e) => setProdCategory(e.target.value)}>
                    <option value="Tecnico">Técnico</option>
                    <option value="Terror">Terror</option>
                    <option value="Romantico">Romántico</option>
                    <option value="Suspenso">Suspenso</option>
                    <option value="Metafisico">Metafísico</option>
                    <option value="Espiritual">Espiritual</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="prodPrice">
                  <Form.Label>Precio ($) *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="prodStock">
                  <Form.Label>Stock Inicial *</Form.Label>
                  <Form.Control
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="prodImage">
              <Form.Label>Ruta o URL de la Imagen *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: /images/React-práctico.webp o URL"
                value={prodImage}
                onChange={(e) => setProdImage(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="prodDesc">
              <Form.Label>Descripción del Libro *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={prodDesc}
                onChange={(e) => setProdDesc(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowProductModal(false)}>
              Cancelar
            </Button>
            <Button variant="success" type="submit" className="d-flex align-items-center gap-2">
              <FaCheck /> Guardar Libro
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title className="d-flex align-items-center gap-2">
            <FaExclamationTriangle /> Confirmar Eliminación
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3">
          ¿Estás seguro de que deseas eliminar permanentemente el elemento{' '}
          <strong>&quot;{deleteTarget?.name}&quot;</strong>?<br />
          Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Sí, eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminDashboard;

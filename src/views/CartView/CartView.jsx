import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Table, Modal, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaTrash, FaArrowLeft, FaTicketAlt, FaCheckCircle, FaShoppingBag, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useCarrito } from '../../context/CarritoContext.jsx';
import { formatPrice } from '../../utils/formatPrice.js';
import { db } from '../../services/firebase.js';
import { collection, addDoc, getDocs, doc, writeBatch, getDoc } from 'firebase/firestore';
import styled from 'styled-components';

const CartContainer = styled(Container)`
  margin-top: 30px;
  margin-bottom: 50px;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const SummaryCard = styled(Card)`
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
`;

function CartView() {
  const { carrito, totalCarrito, quitarDelCarrito, limpiarCarrito } = useCarrito();

  // Coupon States
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Checkout Form States
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerConfirmEmail, setBuyerConfirmEmail] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Apply Coupon logic from Firestore
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    try {
      const colRef = collection(db, 'cupones');
      const querySnapshot = await getDocs(colRef);
      const couponDoc = querySnapshot.docs.find(doc => doc.data().codigo === code);

      if (couponDoc) {
        const discount = couponDoc.data().descuento;
        setDiscountPercent(discount);
        setAppliedCoupon(code);
        setCouponSuccess(`¡Cupón "${code}" aplicado con éxito! Obtienes un ${discount}% de descuento.`);
      } else {
        setCouponError('El cupón ingresado no existe o ha expirado.');
        setDiscountPercent(0);
        setAppliedCoupon('');
      }
    } catch (err) {
      console.error(err);
      setCouponError('Ocurrió un error al validar el cupón.');
    }
  };

  // Checkout submit logic
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setCheckoutError('');

    // Validations
    if (!buyerName.trim() || !buyerPhone.trim() || !buyerEmail.trim()) {
      setCheckoutError('Por favor, completa todos los campos del comprador.');
      return;
    }

    if (buyerEmail !== buyerConfirmEmail) {
      setCheckoutError('Los correos electrónicos no coinciden.');
      return;
    }

    setIsSubmittingOrder(true);

    try {
      const finalDiscount = (totalCarrito * discountPercent) / 100;
      const finalTotal = totalCarrito - finalDiscount;

      // Construct Order
      const order = {
        comprador: {
          nombre: buyerName.trim(),
          telefono: buyerPhone.trim(),
          email: buyerEmail.trim(),
        },
        items: carrito.map(item => ({
          id: item.id,
          titulo: item.titulo,
          precio: item.precio,
          cantidad: item.quantity
        })),
        totalOriginal: totalCarrito,
        descuentoAplicado: finalDiscount,
        cuponUtilizado: appliedCoupon || null,
        totalFinal: finalTotal,
        fecha: new Date().toISOString(),
        estado: 'generada'
      };

      // Add order document to Firestore
      const docRef = await addDoc(collection(db, 'ordenes'), order);
      setOrderId(docRef.id);

      // Batch update: deduct stock for each purchased book in Firestore
      const batch = writeBatch(db);
      for (const item of carrito) {
        const productRef = doc(db, 'productos', item.id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const currentStock = productSnap.data().stock;
          batch.update(productRef, {
            stock: Math.max(0, currentStock - item.quantity)
          });
        }
      }
      await batch.commit();

      // Clear Context Cart
      limpiarCarrito();
    } catch (err) {
      console.error('Error al generar la orden:', err);
      setCheckoutError('No se pudo procesar tu compra. Revisa tu conexión a internet.');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const discountAmount = (totalCarrito * discountPercent) / 100;
  const grandTotal = totalCarrito - discountAmount;

  if (orderId) {
    return (
      <Container className="py-5 text-center">
        <Helmet>
          <title>Orden Generada | Librería Online</title>
        </Helmet>
        <Card className="border-0 shadow-lg p-5 max-w-lg mx-auto" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Card.Body>
            <FaCheckCircle className="text-success mb-4" size={65} />
            <h1 className="h2 mb-2 fw-bold text-dark">¡Muchas gracias por tu compra!</h1>
            <p className="text-muted mb-4">
              Hemos registrado tu orden y estamos preparando tus libros.
            </p>
            <div className="bg-light p-4 rounded-3 text-start mb-4">
              <div className="mb-2"><strong>ID de la Orden:</strong> <span className="text-primary font-monospace">{orderId}</span></div>
              <div className="mb-2"><strong>Comprador:</strong> {buyerName}</div>
              <div className="mb-2"><strong>Email de contacto:</strong> {buyerEmail}</div>
              <div className="border-top pt-2 mt-2"><strong>Total abonado:</strong> <span className="fs-5 fw-bold">{formatPrice(grandTotal)}</span></div>
            </div>
            <Link to="/productos" className="btn btn-primary px-4 py-2 w-100" style={{ backgroundColor: '#1d3557', borderColor: '#1d3557' }}>
              Volver a la Tienda
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (carrito.length === 0) {
    return (
      <CartContainer>
        <Helmet>
          <title>Carrito Vacío | Librería Online</title>
        </Helmet>
        <EmptyCart>
          <FaShoppingBag className="text-muted mb-3" size={60} />
          <h1 className="h3 mb-2">Tu carrito está vacío</h1>
          <p className="text-muted mb-4">Recorre nuestro catálogo y agrega los libros que desees leer.</p>
          <Link to="/productos" className="btn btn-primary px-4 py-2" style={{ backgroundColor: '#1d3557', borderColor: '#1d3557' }}>
            Explorar catálogo
          </Link>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <Helmet>
        <title>Mi Carrito de Compras | Librería Online</title>
        <meta name="description" content="Revisa los libros en tu carrito, aplica cupones de descuento y finaliza tu compra de forma segura." />
      </Helmet>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h1 className="h2 fw-bold text-dark mb-0">Mi carrito de compras</h1>
        <Button variant="outline-danger" size="sm" onClick={limpiarCarrito}>
          Vaciar carrito
        </Button>
      </div>

      <Row>
        {/* Products Table */}
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm overflow-hidden mb-4">
            <Card.Body className="p-0">
              <Table responsive hover className="align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Libro</th>
                    <th className="text-end">Precio unitario</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-end">Subtotal</th>
                    <th className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3 py-1">
                          <img
                            src={item.imagen}
                            alt={item.titulo}
                            style={{ width: '45px', height: '62px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                          <div>
                            <div className="fw-bold text-dark">{item.titulo}</div>
                            <small className="text-muted">{item.autor}</small>
                          </div>
                        </div>
                      </td>
                      <td className="text-end">{formatPrice(item.precio)}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end fw-bold text-dark">{formatPrice(item.precio * item.quantity)}</td>
                      <td className="text-center">
                        <Button
                          variant="link"
                          className="text-danger p-0"
                          onClick={() => quitarDelCarrito(item.id)}
                          aria-label={`Eliminar ${item.titulo}`}
                        >
                          <FaTrash size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Checkout Form */}
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <Card.Title className="mb-3 d-flex align-items-center gap-2">
                <FaUser className="text-primary" /> Datos del Comprador
              </Card.Title>
              {checkoutError && <Alert variant="danger">{checkoutError}</Alert>}
              <Form onSubmit={handleCheckoutSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="buyerName">
                      <Form.Label>Nombre Completo *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ej: Juan Pérez"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        required
                        disabled={isSubmittingOrder}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="buyerPhone">
                      <Form.Label>Teléfono de contacto *</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Ej: +54 9 11 5555-0100"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        required
                        disabled={isSubmittingOrder}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="buyerEmail">
                      <Form.Label>Correo electrónico *</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        required
                        disabled={isSubmittingOrder}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="buyerConfirmEmail">
                      <Form.Label>Confirmar Correo electrónico *</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Repite el correo"
                        value={buyerConfirmEmail}
                        onChange={(e) => setBuyerConfirmEmail(e.target.value)}
                        required
                        disabled={isSubmittingOrder}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2 mt-2 d-flex align-items-center justify-content-center gap-2"
                  disabled={isSubmittingOrder}
                  style={{ backgroundColor: '#1d3557', borderColor: '#1d3557' }}
                >
                  {isSubmittingOrder ? (
                    <>
                      <Spinner size="sm" animation="border" /> Generando compra...
                    </>
                  ) : (
                    <>
                      Finalizar compra
                    </>
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Purchase Summary */}
        <Col lg={4}>
          {/* Coupon Code section */}
          <SummaryCard className="mb-4">
            <Card.Body className="p-4">
              <Card.Title className="mb-3 d-flex align-items-center gap-2 h6 text-uppercase text-muted">
                <FaTicketAlt /> Cupón de Descuento
              </Card.Title>
              {couponError && <Alert variant="danger" className="py-2 px-3 small">{couponError}</Alert>}
              {couponSuccess && <Alert variant="success" className="py-2 px-3 small">{couponSuccess}</Alert>}
              <Form onSubmit={handleApplyCoupon}>
                <InputGroup>
                  <Form.Control
                    placeholder="Código (Ej: TALENTOLAB)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={!!appliedCoupon}
                  />
                  <Button variant="outline-secondary" type="submit" disabled={!!appliedCoupon}>
                    Aplicar
                  </Button>
                </InputGroup>
              </Form>
            </Card.Body>
          </SummaryCard>

          {/* Pricing Totals */}
          <SummaryCard>
            <Card.Body className="p-4">
              <Card.Title className="mb-4 text-uppercase text-muted h6">Resumen de compra</Card.Title>
              <div className="d-flex justify-content-between mb-3 text-muted">
                <span>Subtotal ({carrito.reduce((sum, i) => sum + i.quantity, 0)} ítems)</span>
                <span>{formatPrice(totalCarrito)}</span>
              </div>

              {discountPercent > 0 && (
                <div className="d-flex justify-content-between mb-3 text-success">
                  <span>Descuento ({discountPercent}% con {appliedCoupon})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <hr />

              <div className="d-flex justify-content-between mb-4 mt-2">
                <span className="fw-bold text-dark fs-5">Total</span>
                <span className="fw-bold text-primary fs-4">{formatPrice(grandTotal)}</span>
              </div>

              <div className="text-center">
                <Link to="/productos" className="text-decoration-none text-muted small d-inline-flex align-items-center gap-1">
                  <FaArrowLeft size={10} /> Seguir comprando
                </Link>
              </div>
            </Card.Body>
          </SummaryCard>
        </Col>
      </Row>
    </CartContainer>
  );
}

export default CartView;

export function formatPrice(value) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value);
}

export function hasOffer(product) {
  return Boolean(product?.oferta && Number(product?.descuento) > 0);
}

export function getFinalPrice(product) {
  if (!hasOffer(product)) {
    return Number(product?.precio ?? 0);
  }

  const price = Number(product.precio);
  const discount = Number(product.descuento);

  return Math.round(price - (price * discount) / 100);
}

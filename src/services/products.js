export async function getProducts() {
  const response = await fetch('/data/productos.json');

  if (!response.ok) {
    throw new Error('No se pudo cargar el catalogo de libros.');
  }

  return response.json();
}

export async function getProductById(id) {
  const products = await getProducts();
  return products.find((product) => product.id === id) ?? null;
}

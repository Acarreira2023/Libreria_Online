import { createContext, useContext, useMemo, useState } from 'react';

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad) => {
    setCarrito((carritoActual) => {
      const itemEnCarrito = carritoActual.find((item) => item.id === producto.id);
      const cantidadActual = itemEnCarrito?.quantity ?? 0;
      const stockDisponible = producto.stock - cantidadActual;

      if (stockDisponible <= 0) {
        return carritoActual;
      }

      const cantidadSegura = Math.min(cantidad, stockDisponible);

      if (itemEnCarrito) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + cantidadSegura }
            : item
        );
      }

      // Mantenemos las claves en español para consistencia o mapeamos
      return [...carritoActual, { ...producto, quantity: cantidadSegura }];
    });
  };

  const quitarDelCarrito = (productoId) => {
    setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== productoId));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const obtenerCantidadItem = (productoId) => {
    return carrito.find((item) => item.id === productoId)?.quantity ?? 0;
  };

  const cantidadCarrito = useMemo(
    () => carrito.reduce((total, item) => total + item.quantity, 0),
    [carrito]
  );

  const totalCarrito = useMemo(
    () => carrito.reduce((total, item) => total + item.precio * item.quantity, 0),
    [carrito]
  );

  const value = {
    carrito,
    agregarAlCarrito,
    quitarDelCarrito,
    limpiarCarrito,
    obtenerCantidadItem,
    cantidadCarrito,
    totalCarrito,
  };

  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  const context = useContext(CarritoContext);

  if (!context) {
    throw new Error('useCarrito debe utilizarse dentro de CarritoProvider');
  }

  return context;
}

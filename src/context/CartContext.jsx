import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart((currentCart) => {
      const cartItem = currentCart.find((item) => item.id === product.id);
      const currentQuantity = cartItem?.quantity ?? 0;
      const availableQuantity = product.stock - currentQuantity;

      if (availableQuantity <= 0) {
        return currentCart;
      }

      const safeQuantity = Math.min(quantity, availableQuantity);

      if (cartItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item,
        );
      }

      return [...currentCart, { ...product, quantity: safeQuantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemQuantity = (productId) => {
    return cart.find((item) => item.id === productId)?.quantity ?? 0;
  };

  const cartQuantity = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.precio * item.quantity, 0),
    [cart],
  );

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getItemQuantity,
    cartQuantity,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe utilizarse dentro de CartProvider');
  }

  return context;
}

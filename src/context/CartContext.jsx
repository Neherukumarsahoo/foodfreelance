import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // -- Cart Management --
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeCoupon, setActiveCoupon] = useState(null);

  // -- Hearted (Wishlist) Management --
  const [heartedItems, setHeartedItems] = useState(() => {
    const saved = localStorage.getItem("curator_hearted");
    return saved ? JSON.parse(saved) : [];
  });

  // -- Toast Management --
  const [toast, setToast] = useState({ show: false, message: "", type: "primary" });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("curator_hearted", JSON.stringify(heartedItems));
  }, [heartedItems]);

  const showToast = (message, type = "primary") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "primary" }), 3000);
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.title === product.title);
      if (existing) {
        return prev.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`"${product.title}" added to tray`);
  };

  const removeFromCart = (title) => {
    setCartItems((prev) => prev.filter((item) => item.title !== title));
    showToast(`Item removed from tray`, "error");
  };

  const updateQuantity = (title, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.title === title) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const toggleHeart = (product) => {
    const isHearted = heartedItems.some(item => item.title === product.title);
    if (isHearted) {
      setHeartedItems(prev => prev.filter(item => item.title !== product.title));
      showToast(`Removed from Hearted Curations`, "error");
    } else {
      setHeartedItems(prev => [...prev, product]);
      showToast(`Added to Hearted Curations`, "success");
    }
  };
  // -- Dynamic Orders Management --
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("curator_orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("curator_orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          let icon = "schedule";
          if (newStatus === "Preparing") icon = "skillet";
          else if (newStatus === "Delivered") icon = "check_circle";
          else if (newStatus === "Out for Delivery") icon = "local_shipping";
          else if (newStatus === "Cancelled") icon = "cancel";
          return { ...order, status: newStatus, icon };
        }
        return order;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setActiveCoupon(null);
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const priceStr = item.price.replace(/[^\d.-]/g, "");
    const price = parseFloat(priceStr) || 0;
    return acc + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        activeCoupon,
        setActiveCoupon,
        heartedItems,
        toggleHeart,
        toast,
        showToast,
        orders,
        addOrder,
        updateOrderStatus
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

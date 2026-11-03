import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiFetch, ApiError } from "../lib/api";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }
    try {
      setLoading(true);
      const data = await apiFetch("/api/cart");
      setCartItems(Array.isArray(data) ? data : []);
    } catch {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authLoading) {
      fetchCart();
    }
  }, [authLoading, fetchCart]);

  const cartCount = cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);

  const addToCart = async (product, quantity = 1) => {
    if (!isAuthenticated) {
      showToast({
        message: "Silakan masuk untuk menambahkan barang ke keranjang",
        type: "warning",
        duration: 4500,
        action: (
          <a
            href="/login"
            className="px-2.5 py-1 rounded-lg bg-pink-600 text-white font-bold text-xs hover:bg-pink-700 transition"
          >
            Masuk
          </a>
        ),
      });
      return false;
    }

    try {
      await apiFetch("/api/cart", {
        method: "POST",
        body: {
          product_id: product.id,
          quantity,
        },
      });

      await fetchCart();
      showToast({
        message: `${product.name || "Produk"} berhasil dimasukkan ke keranjang!`,
        type: "success",
      });
      return true;
    } catch (error) {
      showToast({
        message: error.message || "Gagal menambahkan produk ke keranjang",
        type: "error",
      });
      return false;
    }
  };

  const updateQuantity = async (cartId, quantity) => {
    try {
      await apiFetch(`/api/cart/${cartId}`, {
        method: "PUT",
        body: { quantity },
      });
      setCartItems((prev) =>
        prev.map((item) => (item.id === cartId ? { ...item, quantity } : item))
      );
      return true;
    } catch (error) {
      showToast({
        message: error.message || "Gagal mengubah jumlah produk",
        type: "error",
      });
      return false;
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await apiFetch(`/api/cart/${cartId}`, {
        method: "DELETE",
      });
      setCartItems((prev) => prev.filter((item) => item.id !== cartId));
      showToast({
        message: "Produk dihapus dari keranjang",
        type: "info",
      });
      return true;
    } catch (error) {
      showToast({
        message: error.message || "Gagal menghapus produk",
        type: "error",
      });
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

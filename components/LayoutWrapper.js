'use client';

import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import { useState } from "react";

export default function LayoutWrapper({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
}


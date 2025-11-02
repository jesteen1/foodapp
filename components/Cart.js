'use client';

import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Cart({ isOpen, onClose }) {
  const { cart, getTotalPrice, getTotalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key to close cart
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with Image */}
      <div
        className="fixed inset-0 z-40 transition-opacity"
        onClick={onClose}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&h=1080&fit=crop&q=80')"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
      </div>

      {/* Cart Sidebar */}
      <div 
        className="fixed right-0 top-0 h-full w-full sm:w-96 sm:max-w-md bg-white shadow-xl z-50 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 min-h-0 bg-white">
          {!mounted ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="mt-4 text-gray-600">Your cart is empty</p>
              <Link
                href="/products"
                onClick={onClose}
                className="mt-4 inline-block bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {mounted && cart.length > 0 && (
          <div className="border-t p-4 space-y-4 bg-white">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-orange-600">₹{getTotalPrice()}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-orange-600 text-white text-center py-3 rounded-lg hover:bg-orange-700 transition font-medium"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}


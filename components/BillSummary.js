'use client';

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function BillSummary() {
  const { cart, getTotalPrice } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  const subtotal = getTotalPrice();
  const deliveryCharge = 50;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + deliveryCharge + tax;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.name} × {item.quantity}
            </span>
            <span className="text-gray-800 font-medium">
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t pt-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-800">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Delivery Charge</span>
          <span className="text-gray-800">₹{deliveryCharge}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (5%)</span>
          <span className="text-gray-800">₹{tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 flex justify-between text-lg font-bold">
          <span className="text-gray-800">Total</span>
          <span className="text-orange-600">₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}


'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function PaymentForm({ address, onPaymentSuccess }) {
  const { getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [processing, setProcessing] = useState(false);

  const subtotal = getTotalPrice();
  const deliveryCharge = 50;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryCharge + tax;

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // In a real app, this would call Stripe/Razorpay API
      const orderId = `ORD-${Date.now()}`;
      clearCart();
      onPaymentSuccess(orderId);
      setProcessing(false);
    }, 2000);
  };

  return (
    <form onSubmit={handlePayment} className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h3>

      <div className="space-y-3">
        <label className="flex items-center p-4 border-2 border-orange-600 rounded-lg cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="online"
            checked={paymentMethod === 'online'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-3"
          />
          <div className="flex-1">
            <span className="font-medium text-gray-800">Online Payment</span>
            <p className="text-sm text-gray-600">Pay securely with card or UPI</p>
          </div>
        </label>

        <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-3"
          />
          <div className="flex-1">
            <span className="font-medium text-gray-800">Cash on Delivery</span>
            <p className="text-sm text-gray-600">Pay when you receive your order</p>
          </div>
        </label>
      </div>

      {paymentMethod === 'online' && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              maxLength="19"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                maxLength="5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                maxLength="3"
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between text-lg font-bold">
          <span>Total Amount</span>
          <span className="text-orange-600">₹{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={processing}
        className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Your payment is secured and encrypted
      </p>
    </form>
  );
}


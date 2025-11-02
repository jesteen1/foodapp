'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import AddressForm from '@/components/AddressForm';
import BillSummary from '@/components/BillSummary';
import PaymentForm from '@/components/PaymentForm';
import DeliveryInfo from '@/components/DeliveryInfo';

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState('address');
  const [address, setAddress] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <button
            onClick={() => router.push('/products')}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddressSubmit = (addressData) => {
    setAddress(addressData);
    setStep('payment');
  };

  const handlePaymentSuccess = (id) => {
    setOrderId(id);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll start preparing it right away.
          </p>
          {orderId && (
            <p className="text-sm text-gray-500 mb-6">Order ID: {orderId}</p>
          )}
          <DeliveryInfo address={address} orderId={orderId} />
          <div className="mt-6 space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-medium"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {step === 'address' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <AddressForm onAddressSubmit={handleAddressSubmit} />
              </div>
            )}

            {step === 'payment' && (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <PaymentForm address={address} onPaymentSuccess={handlePaymentSuccess} />
                </div>
                <DeliveryInfo address={address} />
              </>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <BillSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


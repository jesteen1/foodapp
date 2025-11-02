'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded"
          sizes="(max-width: 640px) 64px, 80px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{item.name}</h4>
        <p className="text-xs sm:text-sm text-gray-600">₹{item.price} each</p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <div className="flex items-center gap-1 border border-gray-300 rounded">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 transition"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 transition"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600 hover:text-red-800 text-xs sm:text-sm font-medium px-2 py-1 rounded hover:bg-red-50 transition"
          >
            Remove
          </button>
        </div>
        <p className="text-sm font-semibold text-gray-800 mt-1">
          Total: ₹{item.price * item.quantity}
        </p>
      </div>
    </div>
  );
}


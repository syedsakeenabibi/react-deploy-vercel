import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmed = () => {
  const location = useLocation();

  const orderId = useMemo(() => {
    const query = new URLSearchParams(location.search);
    const orderId = query.get('orderId');
    return orderId;
  }, [location.search]);

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      {/* Image */}
      <img
        src="/images/orderconfirm.jpg"
        alt="Order Confirmed"
        className="w-3/4 max-w-md mb-6 rounded-lg shadow-md border border-gray-300 hover:shadow-xl transition-shadow duration-300"
      />

      {/* Confirmation Message */}
      <h1 className="text-2xl font-bold mb-4">Thank you for shopping with us!</h1>
      <p className="text-lg">
        Your order has been successfully placed. Your order ID is{' '}
        <strong>{orderId}</strong>.
      </p>
    </div>
  );
};

export default OrderConfirmed;

"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from local storage
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(existingCartItems);
  }, []);

  const renderCartItems = () => {
    return cartItems.map((item) => (
      <div key={item.id} className="flex items-center border p-4 mb-4">
        <div className="flex-shrink-0 w-16 h-16">
          <Image width={500}  height={500}  src={item.image} alt={item.title}  className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 ml-4">
          <p className="text-lg font-semibold">{item.title}</p>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
          <p className="text-green-700">Price: ${item.price.toFixed(2)}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          {renderCartItems()}
          <p className="text-xl font-bold mt-8">
            Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

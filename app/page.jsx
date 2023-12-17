"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';


const Page = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.price - b.price;
    } else if (sortOrder === 'highToLow') {
      return b.price - a.price;
    }
    return 0;
  });

  const filteredProducts = sortedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const foundProduct = existingCartItems.find((item) => item.id === product.id);

    if (foundProduct) {
      foundProduct.quantity += 1;
    } else {
      product.quantity = 1;
      existingCartItems.push(product);
    }

    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key={fullStars} className="text-yellow-500" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={fullStars + (hasHalfStar ? 1 : 0) + i} className="text-yellow-500" />);
    }

    return stars;
  };


  return (
    <div className="container mx-auto py-10">
      <h2 className="text-4xl font-bold text-center mb-10 overflow-hidden">Product List</h2>
      <div className="flex justify-between items-center mb-4">
        <div>
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded px-3 py-1"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div>
          <select
            className="border border-gray-300 rounded px-3 py-1"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image width={300} height={300} className="w-full h-48 object-cover object-center" src={product.image} alt={product.title} />
            <div className="p-4">
              <h3 className="text-sm line-clamp-2 h-10 font-medium hover:text-amber-600 transition-all duration-300">{product.title}</h3>
              <div className="flex items-center mb-2">
                {renderRatingStars(product.rating.rate)}
                <span className="ml-2 text-gray-600">{product.rating.rate}</span>
              </div>
              <p className="text-gray-600">${product.price}</p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

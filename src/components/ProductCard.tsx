import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Plant } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  plant: Plant;
  onProductClick: (plant: Plant) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ plant, onProductClick }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(plant);
  };

  const careLevelColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

  return (
    <div
      onClick={() => onProductClick(plant)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${careLevelColors[plant.care_level]}`}>
            {plant.care_level}
          </span>
        </div>
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100">
          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
        </button>
        {!plant.in_stock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
            {plant.name}
          </h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{plant.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 italic mb-2">{plant.scientific_name}</p>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {plant.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-emerald-600">${plant.price}</span>
          <span className="text-sm text-gray-500">{plant.size}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Care</span>
            <span className="text-sm font-medium">{plant.water_frequency}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!plant.in_stock}
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
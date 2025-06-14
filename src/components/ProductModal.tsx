import React from 'react';
import { X, Star, ShoppingCart, Droplets, Sun, Ruler } from 'lucide-react';
import { Plant } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ plant, isOpen, onClose }) => {
  const { addToCart } = useCart();

  if (!isOpen || !plant) return null;

  const handleAddToCart = () => {
    addToCart(plant);
  };

  const careLevelColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{plant.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${careLevelColors[plant.care_level]}`}>
                  {plant.care_level} Care
                </span>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-lg font-semibold">{plant.rating}</span>
                  <span className="ml-1 text-gray-500">({plant.reviews_count} reviews)</span>
                </div>
              </div>
              <p className="text-lg text-gray-500 italic mb-4">{plant.scientific_name}</p>
              <p className="text-gray-700 leading-relaxed">{plant.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Droplets className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-900">Watering</p>
                  <p className="text-blue-700">{plant.water_frequency}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
                <Sun className="h-6 w-6 text-yellow-600" />
                <div>
                  <p className="font-semibold text-yellow-900">Light</p>
                  <p className="text-yellow-700">{plant.light_requirement}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Ruler className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">Size</p>
                  <p className="text-green-700">{plant.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <div>
                  <p className="font-semibold text-purple-900">Pot</p>
                  <p className="text-purple-700">{plant.pot_included ? 'Included' : 'Not included'}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl font-bold text-emerald-600">${plant.price}</span>
                  <p className="text-gray-600 mt-1">
                    {plant.in_stock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!plant.in_stock}
                className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Plant } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  plants: Plant[];
  onProductClick: (plant: Plant) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ plants, onProductClick }) => {
  if (plants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No plants found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {plants.map((plant) => (
        <ProductCard
          key={plant.id}
          plant={plant}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
};
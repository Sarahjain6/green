import React from 'react';
import { Filter } from 'lucide-react';

interface FiltersProps {
  selectedCategory: string;
  selectedCareLevel: string;
  priceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onCareLevelChange: (careLevel: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  selectedCategory,
  selectedCareLevel,
  priceRange,
  onCategoryChange,
  onCareLevelChange,
  onPriceRangeChange
}) => {
  const categories = ['All', 'Indoor', 'Outdoor', 'Succulent', 'Tropical', 'Herb'];
  const careLevels = ['All', 'Easy', 'Medium', 'Hard'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-emerald-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Care Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Care Level
          </label>
          <select
            value={selectedCareLevel}
            onChange={(e) => onCareLevelChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
          >
            {careLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="200"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Filters } from './components/Filters';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { Cart } from './components/Cart';
import { plants } from './data/plants';
import { Plant } from './types';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCareLevel, setSelectedCareLevel] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredPlants = useMemo(() => {
    return plants.filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plant.scientific_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || plant.category === selectedCategory;
      const matchesCareLevel = selectedCareLevel === 'All' || plant.care_level === selectedCareLevel;
      const matchesPrice = plant.price >= priceRange[0] && plant.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesCareLevel && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedCareLevel, priceRange]);

  const handleProductClick = (plant: Plant) => {
    setSelectedPlant(plant);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPlant(null);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          onSearchChange={setSearchQuery}
          onCartToggle={handleCartToggle}
        />
        
        <Hero />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Filters
            selectedCategory={selectedCategory}
            selectedCareLevel={selectedCareLevel}
            priceRange={priceRange}
            onCategoryChange={setSelectedCategory}
            onCareLevelChange={setSelectedCareLevel}
            onPriceRangeChange={setPriceRange}
          />
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Our Plants Collection
            </h2>
            <p className="text-gray-600">
              Showing {filteredPlants.length} of {plants.length} plants
            </p>
          </div>
          
          <ProductGrid 
            plants={filteredPlants}
            onProductClick={handleProductClick}
          />
        </main>

        <ProductModal
          plant={selectedPlant}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </div>
    </CartProvider>
  );
}

export default App;
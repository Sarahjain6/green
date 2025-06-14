export interface Plant {
  id: string;
  name: string;
  scientific_name: string;
  price: number;
  image: string;
  description: string;
  care_level: 'Easy' | 'Medium' | 'Hard';
  category: 'Indoor' | 'Outdoor' | 'Succulent' | 'Tropical' | 'Herb';
  light_requirement: 'Low' | 'Medium' | 'Bright';
  water_frequency: string;
  size: string;
  pot_included: boolean;
  in_stock: boolean;
  rating: number;
  reviews_count: number;
}

export interface CartItem {
  plant: Plant;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (plant: Plant) => void;
  removeFromCart: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}
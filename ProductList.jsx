import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import Header from './Header';

const plantsData = [
  { category: 'Air Purifying', name: 'Snake Plant', price: 15, image: 'https://images.unsplash.com/photo-1593482892290-f54927eba714?auto=format&fit=crop&w=300&q=80' },
  { category: 'Air Purifying', name: 'Spider Plant', price: 12, image: 'https://images.unsplash.com/photo-1616858215570-8b1a806954fb?auto=format&fit=crop&w=300&q=80' },
  { category: 'Succulents', name: 'Aloe Vera', price: 10, image: 'https://images.unsplash.com/photo-1596547609652-9cb5d8d752bd?auto=format&fit=crop&w=300&q=80' },
  { category: 'Succulents', name: 'Jade Plant', price: 14, image: 'https://images.unsplash.com/photo-1600412856515-512030ab2b9f?auto=format&fit=crop&w=300&q=80' },
  { category: 'Tropical', name: 'Monstera', price: 25, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=300&q=80' },
  { category: 'Tropical', name: 'Peace Lily', price: 20, image: 'https://images.unsplash.com/photo-1596428054044-672580c8680d?auto=format&fit=crop&w=300&q=80' },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Helper to check if item is already in cart
  const isInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  // Grouping plants by category dynamically
  const groupedPlants = plantsData.reduce((acc, plant) => {
    acc[plant.category] = acc[plant.category] || [];
    acc[plant.category].push(plant);
    return acc;
  }, {});

  return (
    <div>
      <Header />
      <div className="product-list-container">
        {Object.keys(groupedPlants).map((category) => (
          <div key={category} className="product-category">
            <h2>{category}</h2>
            <div className="product-grid">
              {groupedPlants[category].map((plant) => (
                <div key={plant.name} className="product-card">
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>${plant.price}</p>
                  <button 
                    className="add-btn"
                    onClick={() => handleAddToCart(plant)}
                    disabled={isInCart(plant.name)}
                  >
                    {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
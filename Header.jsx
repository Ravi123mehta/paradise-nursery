import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartItems = useSelector(state => state.cart.items);
  // Calculates total number of items dynamically
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <nav>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Plants</Link>
        </div>
        <Link to="/cart" className="cart-icon">
          🛒 Cart <span>{totalItems}</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
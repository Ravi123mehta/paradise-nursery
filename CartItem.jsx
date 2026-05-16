import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { Link } from 'react-router-dom';
import Header from './Header';

const CartItem = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total cost
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calculate total items
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleIncrement = (name) => {
    dispatch(updateQuantity({ name, amount: 1 }));
  };

  const handleDecrement = (name) => {
    dispatch(updateQuantity({ name, amount: -1 }));
  };

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  return (
    <div>
      <Header />
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        <p>Total Plants in Cart: {totalItems}</p>
        
        {cartItems.map(item => (
          <div key={item.name} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Unit Price: ${item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item.name)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item.name)}>+</button>
              </div>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button className="delete-btn" onClick={() => handleRemove(item.name)}>Delete</button>
          </div>
        ))}

        <div className="cart-summary">
          <h3>Total Cost: ${calculateTotalAmount().toFixed(2)}</h3>
          <div className="action-buttons">
            <Link to="/products" className="continue-shopping">Continue Shopping</Link>
            <button onClick={() => alert('Coming Soon')}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
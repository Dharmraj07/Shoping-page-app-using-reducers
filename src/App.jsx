// src/App.jsx
import React, { useState } from 'react';
import { Button, Container, Row, Col, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from './features/cartSlice';
import { createPortal } from 'react-dom';

const foodItems = [
  { id: 1, name: 'Burger', price: 5 },
  { id: 2, name: 'Pizza', price: 8 },
  { id: 3, name: 'Sushi', price: 10 },
  { id: 4, name: 'Pasta', price: 7 },
  { id: 5, name: 'Salad', price: 4 },
];

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = (item) => {
    dispatch(addItemToCart(item));
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <Container>
      <Row className="my-4">
        <Col className="d-flex justify-content-between align-items-center">
          <h1>Redux Cart</h1>
          <Button variant="primary" onClick={toggleCart}>
            Cart <Badge bg="secondary">{cartItems.length}</Badge>
          </Button>
        </Col>
      </Row>

      <Row>
        {foodItems.map(item => (
          <Col key={item.id} xs={12} md={4} className="mb-4">
            <div className="border p-3">
              <h5>{item.name}</h5>
              <p>${item.price}</p>
              <Button variant="success" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </Button>
            </div>
          </Col>
        ))}
      </Row>

      {showCart && createPortal(
        <div className="cart-overlay">
          <div className="cart-popup">
            <h3>Cart Items</h3>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  {item.name} - ${item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <Button variant="danger" onClick={toggleCart}>Close</Button>
          </div>
        </div>,
        document.body
      )}
    </Container>
  );
}

export default App;

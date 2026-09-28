import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  removeItem,
  updateQuantity
} from './CartSlice';

import './CartItem.css';


function CartItem({ onContinueShopping }) {

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );


  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => {
        return total + (item.price * item.quantity);
      },
      0
    );
  };


  const calculateTotalQuantity = () => {
    return cartItems.reduce(
      (total, item) => {
        return total + item.quantity;
      },
      0
    );
  };


  const calculateTotalCost = (item) => {
    return item.price * item.quantity;
  };


  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1
      })
    );
  };


  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1
        })
      );
    } else {
      dispatch(
        removeItem(item.id)
      );
    }
  };


  const handleRemove = (id) => {
    dispatch(
      removeItem(id)
    );
  };


  const handleCheckout = () => {
    alert('Coming Soon!');
  };


  return (
    <div className="cart-container">

      <h1>Shopping Cart</h1>


      <div className="cart-summary">

        <h2>
          Total Plants: {calculateTotalQuantity()}
        </h2>

        <h2>
          Total Cost: ${calculateTotalAmount().toFixed(2)}
        </h2>

      </div>


      {
        cartItems.length === 0 ? (

          <div className="empty-cart">
            <h2>Your cart is empty</h2>
          </div>

        ) : (

          cartItems.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />


              <div className="cart-item-details">

                <h3>{item.name}</h3>

                <p>
                  Unit Price:
                  ${item.price.toFixed(2)}
                </p>

                <p>
                  Quantity:
                  {item.quantity}
                </p>

                <p>
                  Total:
                  ${calculateTotalCost(item).toFixed(2)}
                </p>


                <div className="cart-item-buttons">

                  <button
                    onClick={() =>
                      handleDecrement(item)
                    }
                  >
                    -
                  </button>


                  <span>
                    {item.quantity}
                  </span>


                  <button
                    onClick={() =>
                      handleIncrement(item)
                    }
                  >
                    +
                  </button>


                  <button
                    className="delete-button"
                    onClick={() =>
                      handleRemove(item.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))

        )
      }


      <div className="cart-actions">

        <button
          onClick={onContinueShopping}
          className="continue-shopping-button"
        >
          Continue Shopping
        </button>


        <button
          onClick={handleCheckout}
          className="checkout-button"
        >
          Checkout
        </button>

      </div>

    </div>
  );
}


export default CartItem;

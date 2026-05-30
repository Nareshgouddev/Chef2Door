import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart, removeItem } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  // Handle clear cart
  const handleClearItems = () => {
    dispatch(clearCart());
  };

  // Handle item deletion
  const handleDeleteItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">CART</h1>

      <div>
        <button className="btn-clear-cart" onClick={handleClearItems}>
          Clear Cart
        </button>

        {cartItems.length === 0 && <h1 className="cart-empty-msg">Cart is Empty! Please Add Items:</h1>}

        {/* Item List with Delete Button */}
        {cartItems.length > 0 && (
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <ItemList items={[item]} />
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;


/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./ShoppingCartStyle.css";

export default function ShoppingCart() {
  const [cartItems, setCartitems] = useState([]);

  //Create the addToCart function for the form
  function addToCart(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    // if (typeof name !== "string") {
    //   return `Invalid input string`;
    // }
    if (typeof price !== "number" && Number.isInteger(price)) {
      return `Invalid price value`;
    }
    const newCartItem = {
      id: Date.now(),
      name: name,
      price: price,
    };

    setCartitems([...cartItems, newCartItem]);
  }
  //Remove item from the cart
  function removeItemFromCart(itemId) {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartitems(updatedCartItems);
  }
  //Calculate the totl price of the item in the cart
  function calculateTotalPrice() {
    return cartItems.reduce(
      (total, item) =>
        // {
        //   return total + parseInt(item.price);
        // }, 0
        total + parseInt(item.price),
      0
    );
  }
  return (
    <>
      <div className="cartBox">
        <h1>Cart List</h1>
        <form onSubmit={addToCart}>
          <input type="text" name="name" placeholder="Item name" required />
          <input type="number" name="price" placeholder="Item value" required />
          <button type="submit">Add item to cart</button>
        </form>
        <ul className="cartItemsList">
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.price} - {item.name}
              <button
                onClick={() => removeItemFromCart(item.id)}
                className="removeItemButton"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <p className="totalPrice">
          <span className="priceText">Total price:</span> $
          {calculateTotalPrice()}
        </p>
      </div>
    </>
  );
}

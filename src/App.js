import React, { useEffect, useState } from "react";
import './App.css';
import ShopItems from "./ShopItems";
import Cart from "./Cart";
import Checkout from "./Checkout";

const PAGE_PRODUCTS = 'products';
const PAGE_CHECKOUT = 'checkout';


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);
  
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onCheckout = () => {
    setCartItems([]);
  }

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if(exist.qty===1){
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    }else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  }

  

  const renderCheckout = () => (
    <>
      <Checkout cartItems={cartItems}/>
    </>
  )

  return (
    <div className="App">
      <button onClick={() => navigateTo(PAGE_CHECKOUT)}>Checkout</button>
      <button onClick={() => navigateTo(PAGE_PRODUCTS)}>Products</button>
      {page===PAGE_PRODUCTS && (
        <>
        <div className="product-page">
          <div>
            <ShopItems onAdd={onAdd}/>
          </div>
          <div>
            <Cart onAdd={onAdd} onRemove={onRemove} cartItems={cartItems}/>
          </div>
          </div>
         </>
      )}
      {page===PAGE_CHECKOUT&& renderCheckout()}
      
    </div>
  );

  
}

export default App;

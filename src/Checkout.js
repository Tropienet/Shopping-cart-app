import React, { useState } from "react";

const PAGE_ORDER = 'order';
const PAGE_CHECKOUT = 'checkout';

function Checkout(props) {
    const [page, setPage] = useState(PAGE_CHECKOUT);
    const {cartItems} = props;
    const [promotion, setPromotion] = useState('');
    let i = 0;
    const [promotionCheck, setPromotionCheck] = useState(0);
    const [itemPrice, setItemPrice] = useState(cartItems.reduce((a, c) => a+c.price*c.qty, 0));

   

  /*  const onCheck = () => {
        setItemPrice(cartItems.reduce((a, c) => a+c.price*c.qty, 0));
    }*/

    function applyPromotion(e) {
        
        if(promotion==="20%OFF"){
            if(promotionCheck===0){
                setItemPrice(itemPrice*0.8);
            }
            setPromotionCheck(1);
        }
        if(promotionCheck===0){
            if(promotion==="5%OFF"){
                setItemPrice(itemPrice*0.95);
            }
            if(promotion==="20EUROFF"){
                setItemPrice(itemPrice-20);
            }
            
            for(let i = 0;i<cartItems.length;i++){
                if(cartItems[i].name==="Motion Sensor"&&cartItems[i].qty===3){
                    setItemPrice(itemPrice-10);
                }
                if(cartItems[i].name==="Smoke Sensor"&&cartItems[i].qty===2){
                    setItemPrice(itemPrice-5);
                }
            }
    }
       
    }

    function removePromotion(e) {
        if(promotion==="20%OFF"){
            setItemPrice(itemPrice/0.8);
            setPromotionCheck(0);
        }
        if(promotionCheck===0){
            if(promotion==="5%OFF"){
                setItemPrice(itemPrice/0.95);
            }
            if(promotion==="20EUROFF"){
                setItemPrice(itemPrice+20);
            }
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    const renderOrder = () => (
        <>
            <h2>Your order</h2>
          {cartItems.map((item) => (       
                <div key={i++} >
                    <div>Product name: {item.name}</div>
                    <div>
                        Product quantity: {item.qty} x ${item.price.toFixed(2)}
                    </div>
                    <div>
                        Product price: {item.price*item.qty} 
                    </div>
                    <br></br>
                </div>
            ))}
             <div>
                <p>Price After promotions</p>
                {itemPrice.toFixed(2)}
             </div>
        </>
      )

      const navigateTo = (nextPage) => {
        setPage(nextPage);
      }

    return (
        <div>
            {page === 'checkout'&& (
                <>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email
                        <input type="email" id="email" required></input>
                    </label>
                    <br></br>
                    <label htmlFor="adress">Adress
                        <input type="text" id="adress" required></input>
                    </label>
                    <br></br>
                    <label htmlFor="card">Credit Card number
                        <input type="text" id="card" required></input>
                    </label>
                    <br></br>
                    <button onSubmit={handleSubmit}>Validate details</button>
                    
                </form>
                <button onClick={()=> navigateTo(PAGE_ORDER)}>Checkout</button>
                <br></br>
                <input type="text" onChange={(e) => setPromotion(e.target.value)}></input>
                
                <button onClick={applyPromotion}>Apply promotion</button>
                <button onClick={removePromotion}>Remove promotion</button>
                <br></br>
                    <div>
                        <p>Price After promotions</p>
                        {itemPrice.toFixed(2)}
                    </div>
                <br></br>
                <br></br>
                <h2>How to apply promotions</h2>
                <ol>
                    <li>Click on set price to see current price</li>
                    <li>Apply or remove promotions to see price after promotions</li>
                </ol>
                
            </>
            )}
            {page === 'order' &&renderOrder()}
        </div>
    )
}

export default Checkout;
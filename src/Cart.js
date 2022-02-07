import React, { useState } from "react";


function Cart(props){
    const {cartItems, onAdd, onRemove} = props;
    let itemsPrice = cartItems.reduce((a, c) => a+c.price*c.qty, 0);
    const [promotion, setPromotion] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    const [promotionCheck, setPromotionCheck] = useState(0);

    const onCheck = () => {
        setItemPrice(cartItems.reduce((a, c) => a+c.price*c.qty, 0));
    }

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
   

    

    let i = 0;
    return (     
        <div>
            <h2>Basket Items</h2>
           <div> {cartItems.length === 0 && <div>Cart is Empty</div>}</div>
            {cartItems.map((item) => (       
                <div key={i++} >
                    <div>{item.name}</div>
                    <div>
                        <button onClick={() => onAdd(item)}>+</button>
                    </div>
                    <div>
                        <button onClick={() => onRemove(item)}>-</button>
                    </div>
                    <div>
                        {item.qty} x ${item.price.toFixed(2)}
                    </div>
                    <div>
                        {item.price} 
                    </div>
                </div>
            ))}
            {cartItems.length !== 0 && (
                <div> Price
                    <p>${itemsPrice.toFixed(2)}</p>
                    <button onClick={onCheck}>Calculate item Price after promotions</button>
                    <p>{itemPrice.toFixed(2)}</p>
                </div>
            
            )}
            <div>
                <input type="text" onChange={(e) => setPromotion(e.target.value)}></input>
                <button onClick={applyPromotion}>Apply promotion</button>
                <button onClick={removePromotion}>Remove promotion</button>
                <br></br>
                <br></br>
                <h2>How to calculate price after promotions</h2>
                <ol>
                    <li>Add items to cart</li>
                    <li>Press calculate item Price after promotion to set price to current price</li>
                    <li>Apply/remove promotions</li>
                </ol>
            </div>
        </div>
    )
}

export default Cart;
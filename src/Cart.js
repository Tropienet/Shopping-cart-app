import React, { useState } from "react";


function Cart(props){
    const {cartItems, onAdd, onRemove} = props;
    let itemsPrice = cartItems.reduce((a, c) => a+c.price*c.qty, 0);
    const [promotion, setPromotion] = useState('');
    const [itemPrice, setItemPrice] = useState(cartItems.reduce((a, c) => a+c.price*c.qty, 0));
    const [promotionCheck, setPromotionCheck] = useState(0);
    const [wrongPromotion, setWrongPromotion] = useState(0);
    const [fivePercentOffPromotion, setFivePercentOffPromotion] = useState(0);
    const [twentyEuroOffPromotion, setTwentyEuroOffPromotion] = useState(0);
    

    const onCheck = () => {
        setItemPrice(cartItems.reduce((a, c) => a+c.price*c.qty, 0));
        setPromotionCheck(0);
        setFivePercentOffPromotion(0);
        setTwentyEuroOffPromotion(0);
    }

    

    function applyPromotion(e) {
        if(promotion==="20%OFF"){
            if(promotionCheck===0){
                setItemPrice(itemPrice*0.8);
                setWrongPromotion(0);
            }
            setPromotionCheck(1);
        }
        if(promotionCheck===0){
            if(fivePercentOffPromotion===0){
                if(promotion==="5%OFF"){
                    setItemPrice(itemPrice*0.95);
                    setWrongPromotion(0);
                    setFivePercentOffPromotion(1);
                }
            }
            if(twentyEuroOffPromotion===0){
                if(promotion==="20EUROFF"){
                    setItemPrice(itemPrice-20);
                    setWrongPromotion(0);
                    setTwentyEuroOffPromotion(1);
                }
            }
            if(promotion.length>0&&promotion!=="20EUROFF"&&promotion!=="5%OFF"&&promotion!=="20%OFF"){
                setWrongPromotion(1);
            }
            
            for(let i = 0;i<cartItems.length;i++){
                if(cartItems[i].qty>=3&&cartItems[i].name==="Motion Sensor"){
                    if(cartItems[i].qty%3===0&&cartItems[i].qty!==3){
                     setItemPrice(itemPrice-10*(cartItems[i].qty/3));
                     setWrongPromotion(0);
                    }else{
                     setItemPrice(itemPrice-10*(Math.floor(cartItems[i].qty/3)));
                     setWrongPromotion(0);
                    }
                }
                if(cartItems[i].qty>=2&&cartItems[i].name==="Smoke Sensor"){
                    if(cartItems[i].qty%2===0&&cartItems[i].qty!==2){
                        setItemPrice(itemPrice-5*(cartItems[i].qty/2));
                        setWrongPromotion(0);
                    }else{
                        setItemPrice(itemPrice-5*(Math.floor(cartItems[i].qty/2)));
                        setWrongPromotion(0);
                    }
                }
              }    
            }else if((promotionCheck===1&&promotion==="5%OFF")||(promotionCheck===1&&promotion==="20EUROFF")){
                setWrongPromotion(2);
            }
    }

    function removePromotion(e) {
        setWrongPromotion(0);
        if(promotionCheck===1){
            if(promotion==="20%OFF"){
                setItemPrice(itemPrice/0.8);
                setPromotionCheck(0);
            }
        }
        if(promotionCheck===0){
            if(fivePercentOffPromotion===1){
                if(promotion==="5%OFF"){
                    setItemPrice(itemPrice/0.95);
                    setFivePercentOffPromotion(0);
                }
            }
            if(twentyEuroOffPromotion===1){
                if(promotion==="20EUROFF"){
                    setItemPrice(itemPrice+20);
                    setTwentyEuroOffPromotion(0);
                }
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
                {wrongPromotion===1&&(
                    <>
                        <p>Unesli ste nepostojeći kod za popust</p>
                    </>
                )}
                {wrongPromotion===2&&(
                    <>
                        <p>Kodovi koje ste unesli međusobno se ne smiju kombinirati</p>
                    </>
                )}
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
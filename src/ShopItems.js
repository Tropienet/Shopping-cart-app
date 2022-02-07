import React, { useEffect, useState } from "react";
import firebase from "./firebase"
import Item from "./Item";

function ShopItems(props) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false); 
  const ref = firebase.firestore().collection("Items");
  const {onAdd} = props;

  function getItems() {
    
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setItems(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getItems();
  }, []);

  

  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
     
     {items.map((item) => (
       <Item key={item.id} item={item} onAdd={onAdd}/>
     ))}
      
    </div>
  );

  
}

export default ShopItems;
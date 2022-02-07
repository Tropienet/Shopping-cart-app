import React from "react";

export default function Item(props) {
    const { item, onAdd } = props;

    return (
        <div>
            <h2>{item.name}</h2>
            <div>{item.price}</div>
            <div>
                <button onClick={() => onAdd(item)}>Add to Cart</button>
            </div>
        </div>
    )
}
import React, { useDebugValue } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../Slice/Slice";

function Cart() {
  const items = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  return (
    <>
      <div className="item-container">
        {items.map((item) => {
          return (
            <>
              <div className="single-container"  key={item.id}>
                <span>{item.name}</span>
                <input type="text" readOnly value={item.quantity} />

                <div className="button-set">
                  <button onClick={()=>dispatch(decrement(item.id))}>Decrease</button>
                  <button  onClick={()=> dispatch(increment(item.id))}>Increase</button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Cart;

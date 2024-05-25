import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { stateReducer } from "./Slice";


const store = configureStore({
    reducer:{
        username: stateReducer,
        cart: cartReducer
    }
})
export default store;
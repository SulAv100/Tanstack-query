import { createSlice } from "@reduxjs/toolkit";




const initialState = {

    cartItems:[
        {id:1, name: 'Asus', quantity:0},
        {id:2, name: 'Lenovo', quantity:0},
        {id:3, name: 'HP', quantity:0},
        {id:4, name: 'DELL', quantity:0}



    ]

}



const stateSlice = createSlice({
    name:'username',
    initialState: {
        value:''
    },
    reducers:{
        updateStatus:(state,action)=>{
            state.value = action.payload;
        }
    }
})

export const {updateStatus} = stateSlice.actions;
export const stateReducer = stateSlice.reducer;

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        increment: (state, action)=>{
            const item = state.cartItems.find(item => item.id === action.payload);
            if(item){
                item.quantity+=1;
            }
        },
        decrement:(state, action)=>{
            const item = state.cartItems.find(item=> item.id=== action.payload);
            if(item){
                if(item.quantity<1){
                    item.quantity =0;
                }else{
                    item.quantity-=1;
                }
            }
        }
    }
})
export const {increment, decrement}  = cartSlice.actions;
export default cartSlice.reducer;
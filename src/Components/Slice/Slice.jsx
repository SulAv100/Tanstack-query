import { configureStore, createSlice, isActionCreator } from "@reduxjs/toolkit";


const initialState= {
    items:[
        {id:1, name:"Asus", quantity:0},
        {id:2, name:"Legion", quantity:0},
        {id:3, name:"HP", quantity:0},
        {id:4, name:"Dell", quantity:0},
        {id:5, name:"Lenovo", quantity:0}
    ]
}
 const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        increment:(state,action)=>{
            const item = state.items.find(item=>item.id === action.payload)
            // action payload contains the 
            if(item){
                item.quantity+=1;
            }
        },
        decrement:(state,action)=>{
            const item = state.items.find(item=> item.id === action.payload);
                if(item.quantity<1){
                    item.quantity=0;
                }else{
                    item.quantity-=1;
                }
            
        },
        
    }
 })
 export const {increment, decrement } = cartSlice.actions;
 export default cartSlice.reducer;

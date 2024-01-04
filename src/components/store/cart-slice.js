import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        change: false,
    },
    reducers: {
        replaceCart (state, action){
           state.totalQuantity = action.payload.totalQuantity;
           state.items = action.payload.items;
           
        },
        addItemFromCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            state.change = true;
            if( !existingItem){
                state.items.push({
                    id:newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    quantity: 1,
                    total: newItem.price 
                })

            } else{
                existingItem.quantity ++;
                existingItem.total = existingItem.total + newItem.price;

           }
        },

        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find( item=> item.id === id);
            state.totalQuantity--;
            state.change = true;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter (item => item.id !== id);

            } else {
                existingItem.quantity--;
                existingItem.total = existingItem.total - existingItem.price;
            }
        },

   },

});

export const cartActions = cartSlice.actions;
export default cartSlice;
import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload)
        },
        removeFromCart: (state, action) => {
            return state.filter((e) => e.id !== action.payload)
        }
    }
})

export const { addToCart, removeFromCart } = cart.actions;
export default cart.reducer;
import {configureStore} from '@reduxjs/toolkit'
import cart from './slices/cart-slice'

export const store = configureStore({
    reducer:{
        cart
    }
})
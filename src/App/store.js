import { configureStore } from "@reduxjs/toolkit";
import smartPhoneReducer from '../Redux/filterSlice';
import cartReducer from '../Redux/cartSlice';

export const store = configureStore({
    reducer: {
        smartphone: smartPhoneReducer,
        cart: cartReducer,
    }
})

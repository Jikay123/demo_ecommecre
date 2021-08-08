import { createSlice } from '@reduxjs/toolkit';
import { phones } from '../Data/phones';

const initialState = {
    phoneList: phones,
    brand: []
}

const filterSlice = createSlice({
    name: "smartphone",
    initialState,
    reducers: {
        filterByBrand: (state, action) => {
            console.log(action.payload)
            const newBrand = action.payload

            return { ...state, brand: newBrand }
        }

    }
});

export const {
    filterByBrand
} = filterSlice.actions
export default filterSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddToCart: (state, action) => {
            console.log(action.payload);
            if (state.data !== []) {
                const yup = state.data.findIndex((item) => item.product.id === action.payload.product.id)
                if (yup > -1) {
                    console.log("yub")
                    state.data.splice(yup, 1,
                        { ...state.data[yup], quantity: parseInt(state.data[yup].quantity) + parseInt(action.payload.quantity) })
                } else {
                    state.data.push(action.payload)
                }
            }
        },
        RemoveToCart: (state, action) => {
            console.log(action.payload);
            const yup = state.data.findIndex(item => item.product.id === action.payload);
            console.log(yup)

            if (yup > -1) {
                state.data.splice(yup, 1)
            }
        },
        ChangeQuantity: (state, action) => {
            const yup = state.data.findIndex(item => item.product.id === action.payload.id);
            if (action.payload.type === "add") {
                if (yup > -1) {
                    if (state.data[yup].quantity < 100) {
                        state.data.splice(yup, 1,
                            { ...state.data[yup], quantity: parseInt(state.data[yup].quantity) + 1 })
                    } else {
                        delete state.error;
                        delete state.remove;
                        state.error = "max";
                    }

                }
            } else {
                if (yup > -1) {
                    if (state.data[yup].quantity > 1)
                        state.data.splice(yup, 1,
                            { ...state.data[yup], quantity: parseInt(state.data[yup].quantity) - 1 })
                    else {
                        delete state.error;
                        delete state.remove;
                        state.error = "min";
                        state.remove = action.payload.id;
                    }
                }
            }
        },
        RemoveError: (state, payload) => {
            delete state.error;
        }

    }
});

export const {
    AddToCart, RemoveToCart, ChangeQuantity, RemoveError
} = cartSlice.actions
export default cartSlice.reducer
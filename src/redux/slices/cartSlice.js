import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,

    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addProduct(state, action) {
        //     // const newItems = [...state.items, action.payload]
        //     state.items.push(action.payload)
        //     state.totalPrice =  state.items.reduce((sum,obj)=> {
        //         return obj.price + sum;
        //     }, 0)
        // },
        addProduct(state, action) {
            // const newItems = [...state.items, actions.payload]
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({ ...action.payload, count: 1 })
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0)

        },
        // plusItem(state, action) {
        //     const findItem = state.items.find((obj) => obj.id === action.payload)
        //      if (findItem) {
        //         findItem.count++
        //     }
        // },
        minusProduct(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload)
            if (findItem) {
                findItem.count--
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0);
        },
        removeProduct(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload);
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0);
        },
        clearProduct(state) {
            state.items = []
            state.totalPrice = 0;
        }


    },
})

export const { addProduct, removeProduct, clearProduct, minusProduct } = cartSlice.actions
export default cartSlice.reducer
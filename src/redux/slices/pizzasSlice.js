import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params, thunkAPI) => {
        const { order, sortBy, category, search, currentPage } = params
        const { data } = await axios.get(
            `https://682e1ef0746f8ca4a47bf828.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        );
        // console.log(thunkAPI)
        // if (data.length) {
        //     return thunkAPI.rejectWithValue('Пиццы пустые');
        // } 
        // return thunkAPI.fulfillWithValue(data)
        // console.log(thunkAPI)
        return data
    }
)

const initialState = {
    items: [],
    status: 'loading', // 'loading' | 'success' | 'error'
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }


    },
    extraReducers: (builder) => {
        // Используем builder callback вместо объекта
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                console.log(action, 'fulfilled')
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                console.log(action, 'rejected')
                state.status = 'error';
                state.items = [];
            });
    },
})
export const selectPizzaData = (state) => state.pizzas;

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer
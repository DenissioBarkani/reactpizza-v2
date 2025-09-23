import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';

type FetchPizzasArgs = Record<string, string>

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params: FetchPizzasArgs) => {
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
        return data as Pizza[]
    }
)
type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}

interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, // 'loading' | 'success' | 'error'
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
                state.status = Status.LOADING;
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                console.log(action, 'fulfilled')
                state.items = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                console.log(action, 'rejected')
                state.status = Status.ERROR;
                state.items = [];
            });
    },
})
export const selectPizzaData = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer
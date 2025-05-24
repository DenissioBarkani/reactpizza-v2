import { configureStore } from '@reduxjs/toolkit'

import filterSlice from './slices/filterslice'
export const store = configureStore({
  reducer: { counter: filterSlice},
})
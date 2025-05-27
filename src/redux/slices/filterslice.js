import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
    }

}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, actions) {
            state.categoryId = actions.payload
        },
        setSortType(state, actions) {
            state.sort = actions.payload
            // state.sort.name = actions.payload.name
            // state.sort.sortProperty = actions.payload.sortProperty
        },
        setCurrentPage(state, actions) {
            state.currentPage = actions.payload
            // state.sort.name = actions.payload.name
            // state.sort.sortProperty = actions.payload.sortProperty
        }
    },
})

export const { setCategoryId, setSortType, setCurrentPage } = filterSlice.actions
export default filterSlice.reducer
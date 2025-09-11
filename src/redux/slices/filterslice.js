import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchValue: '',
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
        setSearchValue(state, actions) {
            state.searchValue = actions.payload
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
        },
        setFilters(state, actions) {
            // state = actions.payload
            state.currentPage = Number(actions.payload.currentPage)
            state.sort = actions.payload.sort;
            state.categoryId = Number(actions.payload.categoryId)
        }
    },
})
export const selectFilter = (state) => state.filter

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions
export default filterSlice.reducer
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}


export type Sort = {
    name: string;
    sortProperty: SortPropertyEnum;
};

interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: Sort;
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING_DESC,
    },
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, actions: PayloadAction<number>) {
            state.categoryId = actions.payload;
        },
        setSearchValue(state, actions: PayloadAction<string>) {
            state.searchValue = actions.payload;
        },
        setSortType(state, actions: PayloadAction<Sort>) {
            state.sort = actions.payload;
            // state.sort.name = actions.payload.name
            // state.sort.sortProperty = actions.payload.sortProperty
        },
        setCurrentPage(state, actions: PayloadAction<number>) {
            state.currentPage = actions.payload;
            // state.sort.name = actions.payload.name
            // state.sort.sortProperty = actions.payload.sortProperty
        },
        setFilters(state, actions: PayloadAction<FilterSliceState>) {
            // state = actions.payload
            state.currentPage = Number(actions.payload.currentPage);
            state.sort = actions.payload.sort;
            state.categoryId = Number(actions.payload.categoryId);
        },
    },
});
export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
    filterSlice.actions;
export default filterSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface FilterSliceState {
  clickClear: boolean;
  clickPaginate: boolean;
  currentPage: number;
  categories: number;
  categoriclick: boolean;
  tags: string;
  tagsclick: boolean;
  search: string;
  searchclick: boolean;
}

const initialState: FilterSliceState = {
  clickClear: false, // очистка на главной странице
  clickPaginate: true, // клик на 1 страницу пагинации
  currentPage: 1, // погинация
  categories: 0, // поиск по категориям
  categoriclick: false, // клик по категориям
  tags: '', // поиск по тегам
  tagsclick: false, // клик по тегам
  search: '', // поиск по сайту
  searchclick: false, // ввод поиска
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCurrentClickClear(state, action: PayloadAction<boolean>) {
      state.clickClear = action.payload;
    },
    setCurrentClickPag(state, action: PayloadAction<boolean>) {
      state.clickPaginate = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setCurrentCategories(state, action: PayloadAction<number>) {
      state.categories = action.payload;
    },
    setCurrentCatclick(state, action: PayloadAction<boolean>) {
      state.categoriclick = action.payload;
    },
    setCurrentTags(state, action: PayloadAction<string>) {
      state.tags = action.payload;
    },
    setCurrentTagsclick(state, action: PayloadAction<boolean>) {
      state.tagsclick = action.payload;
    },
    setCurrentSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCurrentSearchclick(state, action: PayloadAction<boolean>) {
      state.searchclick = action.payload;
    },
  },
});

export const selectCurrentClickClear = (state: RootState) => state.filters.clickClear;
export const selectCurrentClickPag = (state: RootState) => state.filters.clickPaginate;
export const selectCurrentPage = (state: RootState) => state.filters.currentPage;
export const selectCurrentCategories = (state: RootState) => state.filters.categories;
export const selectCurrentCatclick = (state: RootState) => state.filters.categoriclick;
export const selectCurrentTags = (state: RootState) => state.filters.tags;
export const selectCurrentTagsclick = (state: RootState) => state.filters.tagsclick;

export const selectCurrentSearch = (state: RootState) => state.filters.search;
export const selectCurrentSearchclick = (state: RootState) => state.filters.searchclick;

export const { setCurrentClickClear } = filterSlice.actions;
export const { setCurrentClickPag } = filterSlice.actions;
export const { setCurrentPage } = filterSlice.actions;
export const { setCurrentCategories } = filterSlice.actions;
export const { setCurrentCatclick } = filterSlice.actions;
export const { setCurrentTags } = filterSlice.actions;
export const { setCurrentTagsclick } = filterSlice.actions;
export const { setCurrentSearch } = filterSlice.actions;
export const { setCurrentSearchclick } = filterSlice.actions;
export default filterSlice.reducer;

// configureStore - создает хранилище
import { configureStore } from '@reduxjs/toolkit';
// import filter from './slices/filterSlice2';
// import car from './slices/carRentalSlice2';
// import apartament from './slices/apartamentSlice2';
// import hotel from './slices/hotelSlice2';
// import travelSlice from './slices/travelSlice';
// import carSlice from './slices/carSlice';
// import apartSlise from './slices/apartamentSlice';
// import hotelSlice from './slices/hotelSlice';
import { useDispatch } from 'react-redux';
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth';
import filterSlice from './slices/filterSlice';

// хранилище
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    filters: filterSlice,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// типизация useDispatch - 24 урок. 1:05:00
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

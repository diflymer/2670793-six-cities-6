import { combineReducers } from '@reduxjs/toolkit';
import offersReducer from './slices/offers-slice';
import userReducer from './slices/user-slice';
import cityReducer from './slices/city-slice';
import sortReducer from './slices/sort-slice';

export const reducer = combineReducers({
  offers: offersReducer,
  user: userReducer,
  city: cityReducer,
  sort: sortReducer,
});

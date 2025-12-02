import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Offer } from '../../types/offer';
import { fetchOffers } from '../api-actions';

export type OffersState = {
  offers: Offer[];
  isOffersLoading: boolean;
};

const initialState: OffersState = {
  offers: [],
  isOffersLoading: false,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    setOffersLoading: (state, action: PayloadAction<boolean>) => {
      state.isOffersLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchOffers.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.isOffersLoading = false;
      state.offers = action.payload;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isOffersLoading = false;
    })
  },
});

export const { loadOffers, setOffersLoading } = offersSlice.actions;
export default offersSlice.reducer;


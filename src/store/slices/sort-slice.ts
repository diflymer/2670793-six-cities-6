import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export type SortState = {
  sortType: SortType;
  isOpen: boolean;
};

const initialState: SortState = {
  sortType: 'Popular',
  isOpen: false,
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
      state.isOpen = false;
    },
    toggleSortMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeSortMenu: (state) => {
      state.isOpen = false;
    },
  },
});

export const { setSortType, toggleSortMenu, closeSortMenu } = sortSlice.actions;
export default sortSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoryAdded(state, action) {
      state.categories.push(action.payload);
    },
    categoryUpdated(state, action) {
      const index = state.categories.findIndex(category => category.id === action.payload.id);
      if (index >= 0) {
        state.categories[index] = action.payload;
      }
    },
    categoryDeleted(state, action) {
      state.categories = state.categories.filter(category => category.id !== action.payload);
    },
  },
});

export const { categoryAdded, categoryUpdated, categoryDeleted } = categorySlice.actions;

export default categorySlice.reducer;

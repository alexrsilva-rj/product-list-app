import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../components/features/productSlice';
import categoryReducer from '../components/features/categorySlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
  },
});

export default store;

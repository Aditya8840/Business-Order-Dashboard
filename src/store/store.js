import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import orderReducer from './order/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
  },
});

export default store;
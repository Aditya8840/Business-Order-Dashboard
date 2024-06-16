import { createSlice } from '@reduxjs/toolkit';
import orderData from '../../orderData.json';

const initialState = {
  orders: JSON.parse(localStorage.getItem('orders')) || orderData,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
      localStorage.setItem('orders', JSON.stringify(action.payload));
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
        localStorage.setItem('orders', JSON.stringify(state.orders));
      }
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    clearOrders: (state) => {
      state.orders = orderData;
      localStorage.setItem('orders', JSON.stringify(orderData));
    },
  },
});

export const { setOrders, addOrder, updateOrder, deleteOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
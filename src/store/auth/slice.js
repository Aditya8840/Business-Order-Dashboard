import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    loadUser: (state) => {
      state.user = JSON.parse(localStorage.getItem('user'));
    },
    logout: (state) => {
      state.user = null;
      state.profile = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, setProfile, loadUser, logout } = authSlice.actions;
export default authSlice.reducer;
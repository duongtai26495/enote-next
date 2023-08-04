"use client"
import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    accessToken: null,
  },
  reducers: {
    setToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;

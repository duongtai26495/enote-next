"use client"

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './sliceAuth';
import tokenSlice from './sliceToken';

const store = configureStore({
  reducer: {
    auth: authSlice,
    token: tokenSlice,
  },
});

export default store;
"use client"

import { Provider } from "react-redux"
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './sliceAuth';
import tokenSlice from './sliceToken';

const store = configureStore({
  reducer: {
    auth: authSlice,
    token: tokenSlice,
  },
});

  

const Providers = ({children}) => {
    return <Provider store={store} >{children}</Provider>
}

export default Providers
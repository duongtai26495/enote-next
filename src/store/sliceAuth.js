"use client"
const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      isLoggedIn: false,
    },
    reducers: {
      userLogin(state) {
        state.isLoggedIn = true;
      },
      userLogout(state) {
        state.isLoggedIn = false;
      },
    },
  });
  
  export const { userLogin, userLogout } = authSlice.actions;
  
  export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    token: "",
  },
  reducers: {
    setLoginReducer: (state, action) => {
      state.currentUser = action.payload.currentUser;
      state.token = action.payload.token;
    },
    setLogoutReducer: (state) => {
      state.currentUser = null;
      state.token = "";
    },
  },
})

export const { 
  setLoginReducer, 
  setLogoutReducer, 
} = userSlice.actions;

export default userSlice.reducer;
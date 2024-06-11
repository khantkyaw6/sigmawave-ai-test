import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	token: null,
};

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		setUserData: (state, { payload }) => {
			state.user = payload.user;
			state.token = payload.token;
		},
		clearUserData: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const { setUserData, clearUserData } = loginSlice.actions;
export default loginSlice.reducer;

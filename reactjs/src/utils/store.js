import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "pages/user/feature/userApi";
import { loginApi } from "pages/login/feature/loginApi";
import loginSlice from "pages/login/feature/loginSlice";
import { registerApi } from "pages/register/feature/registerApi";

export const store = configureStore({
	reducer: {
		loginSlice,
		[userApi.reducerPath]: userApi.reducer,
		[loginApi.reducerPath]: loginApi.reducer,
		[registerApi.reducerPath]: registerApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			userApi.middleware,
			loginApi.middleware,
			registerApi.middleware,
		]),
});

setupListeners(store.dispatch);

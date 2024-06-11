import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./reducer/user";

const persistConfig = {
	key: "root",
	storage,
};

const rootReducer = combineReducers({
	userData: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
			serializableCheck: false
		});
  },
});

export const persistor = persistStore(store);

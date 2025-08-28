import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalStore";
import userReducer from "./userStore";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const userPersistConfig = {
  key: "user",
  storage: storage,
};

const rootReducer = combineReducers({
  modal: modalReducer,
  user: persistReducer(userPersistConfig, userReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

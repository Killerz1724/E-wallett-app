import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createPersistStorage } from "lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import modalReducer from "./modalStore";
import userReducer from "./userStore";

const userPersistConfig = {
  key: "user",
  storage: createPersistStorage(),
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

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

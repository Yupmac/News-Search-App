import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import saveReducer from "./slices/save.js";
import unsaveReudcer from "./slices/unsave.js";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["clippedArticles", "history"],
};

const rootReducer = combineReducers({
  save: persistReducer(persistConfig, saveReducer),
  unsave: unsaveReudcer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

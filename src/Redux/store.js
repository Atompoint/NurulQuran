import { configureStore, combineReducers } from "@reduxjs/toolkit"
import counterSlice from "./allItems"
import isPlayedReducer from "./historyItems"
import isFavouriteReducer from "./favouriteItems"
import isCacheReducer from "./cacheItems"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"

import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  items: counterSlice,
  isPlayed: isPlayedReducer,
  isFavourite: isFavouriteReducer,
  isCached: isCacheReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export default store

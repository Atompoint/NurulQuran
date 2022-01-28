import { configureStore, combineReducers } from "@reduxjs/toolkit"
import counterSlice from "./allItems"
const rootReducer = combineReducers({
  items: counterSlice,
})
const store = configureStore({
  reducer: rootReducer,
})
export default store

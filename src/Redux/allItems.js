import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: [],
}

export const counterSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    fetchItems: (state, action) => {
      return {
        ...state,
        value: [action.payload],
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { fetchItems } = counterSlice.actions

export default counterSlice.reducer

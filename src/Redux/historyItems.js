import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: [],
}

export const counterSlice = createSlice({
  name: "isPlayed",
  initialState,
  reducers: {
    setIsPlayedItems: (state, action) => {
      return {
        ...state,
        value: [...state.value, action.payload],
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setIsPlayedItems } = counterSlice.actions

export default counterSlice.reducer

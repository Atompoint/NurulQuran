import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: [],
}

export const counterSlice = createSlice({
  name: "isFavourite",
  initialState,
  reducers: {
    setIsCacheItems: (state, action) => {
      return {
        ...state,
        value: [...state.value, action.payload],
        


      }

    },
    removeCacheItems: (state, action) => {
      return {
        ...state,
        value: state.value.filter(
          item => item?.node?.name !== action.payload.node.name
        ),
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setIsCacheItems, removeCacheItems } = counterSlice.actions

export default counterSlice.reducer

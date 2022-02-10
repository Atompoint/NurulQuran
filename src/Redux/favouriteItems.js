import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: [],
}

export const counterSlice = createSlice({
  name: "isFavourite",
  initialState,
  reducers: {
    setIsFavouriteItems: (state, action) => {
      return {
        ...state,
        value: [...state.value, action.payload],
      }
    },
    setIsRemoveFavouriteItems: (state, action) => {
      return {
        ...state,
        value: state.value.filter(item => {
          if (item.node) {
            return item.node.name !== (action.payload.node?.name || action.payload.name)
          } else  {
            return item.name !== (action.payload.name || action.payload.node?.name)
          }
        }),
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setIsFavouriteItems, setIsRemoveFavouriteItems } =
  counterSlice.actions

export default counterSlice.reducer

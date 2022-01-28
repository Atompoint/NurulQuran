import React from "react"
import { Provider } from "react-redux"
import createStore from "./src/Redux/store"

export const wrapRootElement = ({ element }) => {
  return <Provider store={createStore}>{element}</Provider>
}


// code added to main

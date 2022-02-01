import React from "react"
import { Provider } from "react-redux"
import createStore from "./src/Redux/store"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
let persistor = persistStore(createStore)

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={createStore}>
      <PersistGate loading={null} persistor={persistor}>
        {element}
      </PersistGate>
    </Provider>
  )
}

// code added to main

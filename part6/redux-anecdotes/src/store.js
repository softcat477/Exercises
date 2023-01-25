import { configureStore } from "@reduxjs/toolkit";

import reducer from './reducers/anecdoteReducer'

const store = configureStore({
  reducer: {
    notes: reducer
  }
})

export default store
import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice(
  {
    name: 'filter',
    initialState: '',
    reducers: {
      addFilterAction: (state, action) => {
        const content = action.payload
        state = content
        return state
      },
      clearFilterAction: (state, action) => {
        state = ""
        return state
      }
    }
  }
)

export default filterSlice.reducer
export const { addFilterAction, clearFilterAction } = filterSlice.actions
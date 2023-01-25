import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice(
  {
    name: 'notification',
    initialState: "Hoi!",
    reducers: {
      addNotificationAction: (state, action) => {
        const content = action.payload
        state = content
        return state
      },
      clearNotificationAction: (state, action) => {
        state = ""
        return state
      }
    }
  }
)

export default notificationSlice.reducer
export const {addNotificationAction, clearNotificationAction} = notificationSlice.actions
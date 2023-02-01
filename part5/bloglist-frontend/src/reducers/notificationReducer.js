import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotificationAction: (state, action) => {
      state = action.payload
      return state
    },
    clearNotificationAction: (state, action) => {
      state = ""
      return state
    }
  }
})

export default notificationSlice.reducer
export const { setNotificationAction, clearNotificationAction } = notificationSlice.actions
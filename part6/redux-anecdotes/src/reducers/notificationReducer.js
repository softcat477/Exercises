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
        state = "Hoi!"
        return state
      }
    }
  }
)

/*
Show <content> on notification and clear the notification afger <timeout_interval> ms.
*/
const addNotification = (content, timeout_interval) => {
  return async dispatch => {
    dispatch(addNotificationAction(content))
    setTimeout(() => {
      dispatch(clearNotificationAction())
    }, timeout_interval)
  }
}

export default notificationSlice.reducer
export const {addNotificationAction, clearNotificationAction} = notificationSlice.actions
export { addNotification }
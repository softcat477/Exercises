import { createSlice } from "@reduxjs/toolkit"

let timeout_id = null

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

    // If there's a on-going timeout, cancel it, or else when setting a series of notifications,
    // we will get some unexpected clear action
    if (timeout_id !== null){
      clearTimeout(timeout_id)
      timeout_id = null
    }

    timeout_id = setTimeout(() => {
      // After <timeout_interval> ms, clear notification text and timeout_id
      dispatch(clearNotificationAction())
      timeout_id = null
    }, timeout_interval)
  }
}

export default notificationSlice.reducer
export const {addNotificationAction, clearNotificationAction} = notificationSlice.actions
export { addNotification }
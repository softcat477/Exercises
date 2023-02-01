import notificationReducer, {setNotificationAction, clearNotificationAction} from './notificationReducer' 
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  test ('add notifiaction', () => {
    const state = ""
    deepFreeze(state)
    const new_state = notificationReducer(state, setNotificationAction("Hoi"))

    expect(new_state).toBe("Hoi")
  })
  test ('clear notifiaction', () => {
    const state = "HOI!"
    deepFreeze(state)
    const new_state = notificationReducer(state, clearNotificationAction())

    expect(new_state).toBe("")
  })
})
import notificationReducer, {addNotificationAction, clearNotificationAction} from "./notificationReducer"
import deepFreeze from "deep-freeze"

describe('notificationReducer', () => {
  test('add notification', () => {
    const payload = "Hello Howdy"
    const state = ""

    deepFreeze(state)
    const newState = notificationReducer(state, addNotificationAction(payload))

    expect(newState).toBe(payload)
  })

  test("clear notification", () => {
    const state = "Before clear"

    deepFreeze(state)
    const newState = notificationReducer(state, clearNotificationAction())

    expect(newState).toBe("Hoi!")
  })
})
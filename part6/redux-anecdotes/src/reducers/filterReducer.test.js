import filterReducer, {addFilterAction, clearFilterAction} from './filterReducer'
import deepFreeze from 'deep-freeze'

describe('filterReducer', () => {
  test('add filter action', () => {
    const payload = "query"
    const state = ""

    deepFreeze(state)
    const newState = filterReducer(state, addFilterAction(payload))

    expect(newState).toBe(payload)
  })

  test('clear filter action', () => {
    const state = "hoi!"

    deepFreeze(state)
    const newState = filterReducer(state, clearFilterAction())

    expect(newState).toBe("")
  })
})
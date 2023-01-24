import reducer from './anecdoteReducer'
import { getVoteAction, getAddAction } from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('reducer', () => {
  test('vote a note', () => {
    const state = [{
      content: 'The Foger familyu welcome Yuri into their home',
      id: 5527,
      votes: 0
    }]
    const action = getVoteAction(5527)

    deepFreeze(state)

    const new_state = reducer(state, action)

    expect(new_state).toHaveLength(1)
    expect(new_state).toContainEqual({
      content: 'The Foger familyu welcome Yuri into their home',
      id: 5527,
      votes: 1
    })
  })

  test('add a note', () => {
    // At first we have no notes
    const state = []
    const action = getAddAction('The Foger familyu welcome Yuri into their home')

    // We add a note
    deepFreeze(state)
    const new_state = reducer(state, action)

    // The note should be added to the state
    expect(new_state).toHaveLength(1)
    expect(new_state[0].content).toBe('The Foger familyu welcome Yuri into their home')
    expect(new_state[0].votes).toBe(0)
  })
})
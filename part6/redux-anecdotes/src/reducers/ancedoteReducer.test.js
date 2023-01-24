import reducer from './anecdoteReducer'
import { getVoteAction } from './anecdoteReducer'
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
})
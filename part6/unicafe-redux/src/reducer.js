const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD': {
      const new_state = {...state, good:state.good + 1}
      return new_state
    }
    case 'OK': {
      const new_state = {...state, ok:state.ok + 1}
      return new_state
    }
    case 'BAD': {
      const new_state = {...state, bad:state.bad + 1}
      return new_state
    }
    case 'ZERO': {
      const new_state = initialState
      return new_state
    }
    default: return state
  }
  
}

export default counterReducer
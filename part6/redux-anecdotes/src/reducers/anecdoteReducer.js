// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

//const asObject = (anecdote) => {
//  return {
//    content: anecdote,
//    id: getId(),
//    votes: 0
//  }
//}

//const initialState = anecdotesAtStart.map(asObject)
import noteService from '../services/notes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE": {
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changed_note = {
        ...noteToChange,
        votes: noteToChange.votes + 1
      }

      return state.map(n => n.id === id ? changed_note : n)
    }
    case "ADD": {
      return state.concat(action.data)
    }
    case "SET": {
      const notes = action.data // A list of notes
      return notes
    }
    default:
      return state
  }
}

const getVoteAction = (id) => {
  return {
    type: 'VOTE',
    data: {id:id}
  }
}

const getAddAction = (content) => {
  /*
  content: an object 
  {
    content: str
    id: int
    votes: int
  }
  */
  return {
    type: 'ADD',
    data: content
  }
}

const getSetAction = (content) => {
  // content: An array of objects read from db.json
  return {
    type: 'SET',
    data: content
  }
}

// To move communication to server outside of Components (the App component)
const setNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(getSetAction(notes))
  }
}

const addNotes = (content) => {
  return async dispatch => {
    const new_note = await noteService.createNew(content)
    dispatch(getAddAction(new_note))
  }
}

const addVote = (id, new_vote) => {
  return async dispatch => {
    // Tell the server to update the vote
    const updated_note = await noteService.addVote({
      id: id,
      new_vote: new_vote
    })
    // dispatch to update votes
    dispatch(getVoteAction(updated_note.id))
  }
}

export default reducer
export { getVoteAction, getAddAction, getSetAction, setNotes, addNotes, addVote }
import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { addNotification } from "../reducers/notificationReducer"

const Anecdote = ({anecdote, handleClick}) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content} - has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}
const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    let sorted_notes = [...state.notes]
    sorted_notes = sorted_notes.sort((a, b) => b.votes - a.votes)
    // filter
    if(state.filter !== ""){
      return sorted_notes.filter(note => note.content.includes(state.filter))
    }

    return sorted_notes})

  const dispatch = useDispatch()

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => {
          dispatch(addVote(anecdote.id, anecdote.votes + 1))
          dispatch(addNotification(`Vote : ${anecdote.content}`, 2000))
        }} />
      )}
    </>
  )
}

export default AnecdoteList
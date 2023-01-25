import { useDispatch, useSelector } from "react-redux"
import { getVoteAction } from "../reducers/anecdoteReducer"

const Anecdote = ({anecdote, handleClick}) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}
const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    let sorted_state = [...state]
    sorted_state = sorted_state.sort((a, b) => b.votes - a.votes)
    return sorted_state})

  const dispatch = useDispatch()

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => dispatch(getVoteAction(anecdote.id))} />
      )}
    </>
  )
}

export default AnecdoteList
import { useSelector, useDispatch } from 'react-redux'

import { getVoteAction } from './reducers/anecdoteReducer'

import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => {
    let sorted_state = [...state]
    sorted_state = sorted_state.sort((a, b) => b.votes - a.votes)
    return sorted_state})
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(getVoteAction(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm />
    </div>
  )
}

export default App
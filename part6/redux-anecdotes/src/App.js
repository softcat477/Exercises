import { useSelector, useDispatch } from 'react-redux'

import { getVoteAction, getAddAction } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(getVoteAction(id))
  }

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value

    dispatch(getAddAction(content))
    event.target.note.value = ''
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
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <input name='note'/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
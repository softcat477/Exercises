import { useDispatch } from "react-redux"
import { addNotes } from "../reducers/anecdoteReducer"
import { addNotificationAction } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value

    dispatch(addNotes(content))

    dispatch(addNotificationAction(`Add : ${content}`))
    event.target.note.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <input name='note'/>
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
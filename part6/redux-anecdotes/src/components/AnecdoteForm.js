import { useDispatch } from "react-redux"
import { getAddAction } from "../reducers/anecdoteReducer"
import { addNotificationAction } from "../reducers/notificationReducer"

import noteService from "../services/notes"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value

    const new_note = await noteService.createNew(content)

    dispatch(getAddAction(new_note))
    dispatch(addNotificationAction(`Add : ${new_note.content}`))
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
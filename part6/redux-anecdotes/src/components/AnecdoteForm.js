import { addNotes } from "../reducers/anecdoteReducer"
import { addNotification } from "../reducers/notificationReducer"
import { connect } from "react-redux"

const AnecdoteForm = (props) => {

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value

    props.addNotes(content)

    props.addNotification(`Add : ${content}`, 2000)
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

const mapDispatchToProps = {
  addNotes, addNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
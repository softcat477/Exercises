import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async(content) => {
  const new_note = {
    content: content,
    votes: 0
  }
  
  const response = await axios.post(baseUrl, new_note)
  return response.data
}

const addVote = async({id, new_vote}) => {
  /*
  id: int 
  new_vote: int
  */
  // Get notes from server and search the one with the matched id
  const notes_response = await axios.get(baseUrl)
  const notes = notes_response.data
  const note = notes.find(n => n.id === id)

  // GET to update its votes
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...note,
    votes: new_vote
  })
  return response.data
}

export default { getAll, createNew, addVote }
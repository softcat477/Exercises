import { useState, useEffect } from 'react'
import axios from 'axios'

const ListPerson = ({persons}) => {
  return (
    <>
      {persons.map(x => 
        <div key={x.id}>
          {x.name} {x.number}
        </div>
      )}
    </>
  )
}

const Field = ({text, value, onChange}) => {
  return (
    <>
      <div>
        {text}: <input value={value} onChange={onChange}/>
      </div>
    </>
  )
}

const PersonForm = ({handleSubmit, newName, handleNewName, newNumber, handleNewNumber}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Field text="name" value={newName} onChange={handleNewName} />
        <Field text="number" value={newNumber} onChange={handleNewNumber} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const App = () => {
  // Variables
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('') // Control the form input element
  const [newNumber, setNewNumber] = useState("")
  const [query, setQuery] = useState("")

  const personsToShown = query.length === 0? persons: persons.filter((x)=>x.name.toLowerCase().includes(query.toLowerCase()))

  // Get data from db.json
  useEffect(() => {
    axios.get("http://localhost:3001/phonebook")
         .then(response => {
          console.log("promise fulfilled and get: ", response.data)
          setPersons(response.data)
         })
  }, [])

  // Callback func
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleQuery = (event) => {
    setQuery(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    let exist_name = persons.map(x=>x.name)

    if (exist_name.includes(newName)){
      alert (newName + " is already added to phonebook")
    }
    else{
      setPersons(persons.concat({name: newName, number:newNumber, id:persons.length}))
      setNewNumber("")
      setNewName("")
    }
  }

  // Component
  return (
    <div>
      <h2>Phonebook</h2>
      <Field text="filter shown with" value={query} onChange={handleQuery} />

      <h2>Add a new</h2>
      <PersonForm handleSubmit={handleSubmit} 
                  newName={newName} handleNewName={handleNewName} 
                  newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h2>Numbers</h2>
      <ListPerson persons={personsToShown} />
    </div>
  )
}

export default App
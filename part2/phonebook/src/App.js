import { useState, useEffect } from 'react'
import personServices from "./services/person"

const ListPerson = ({persons, deletePerson}) => {

  // Show person in the phonebook
  return (
    <>
      {persons.map(x => 
        <div key={x.id}>
          {x.name} {x.number} &nbsp;
          <button onClick={() => deletePerson(x.id)}>delete</button>
        </div>
      )}
    </>
  )
}

const Field = ({text, value, onChange}) => {
  // Used by PersonForm
  //   <text>: [value]
  //   e.g.
  //     name: []
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

  // Use query to filter person to show
  const personsToShown = query.length === 0? persons: persons.filter((x)=>x.name.toLowerCase().includes(query.toLowerCase()))

  // Get data from db.json
  useEffect(() => {
    personServices.getAll()
                  .then(phonebook => {
                    console.log("Get ", phonebook, " from DB.")
                    setPersons(phonebook)
                  })
  }, [])

  // Input new name
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  // Input new number
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  // Input query
  const handleQuery = (event) => {
    setQuery(event.target.value)
  }
  // Add (Submit) a person to phonebook
  const handleSubmit = (event) => {
    event.preventDefault()

    let exist_name = persons.map(x=>x.name)

    if (exist_name.includes(newName)){
      // Ask if the user wants to update this person's info
      if (window.confirm(newName + " is already added to phonebook, replace the old number with a new one?")){
        const person = persons.find(p => p.name === newName)
        const changed_person = {...person, number:newNumber}

        personServices.updatePerson(changed_person.id, changed_person)
                       .then(returned_person => {
                        setPersons(persons.map(p => p.name === newName? returned_person: p))
                        setNewNumber("")
                        setNewName("")
                       })
      }
    }
    else{
      const new_id = Math.max(...persons.map(x => x.id)) + 1
      const new_person = {name: newName, number:newNumber, id:new_id}
      // Save this new person to DB
      personServices.createNew(new_person)
                    .then(ret_new_person => {
                      setPersons(persons.concat(ret_new_person))
                      setNewNumber("")
                      setNewName("")
                    })
    }
  }
  // Delete a person
  const deletePerson = (id) => {
    const perrson_to_delete = persons.filter(x => x.id === id)[0]
    if (window.confirm(`Do you want to delete ${perrson_to_delete.name}?`)){
      personServices.deletePerson(id)
                    .then(() => {
                      const new_persons = persons.filter(x => x.id !== id)
                      setPersons(new_persons)
                    })
                    .catch( error => {
                      const ghost = persons.filter(x => x.id === id)
                      alert (`Cannot delete ${ghost[0].name}`)
                      const new_persons = persons.filter(x => x.id !== id)
                      setPersons(new_persons)
                    })
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
      <ListPerson persons={personsToShown} deletePerson={deletePerson} />
    </div>
  )
}

export default App
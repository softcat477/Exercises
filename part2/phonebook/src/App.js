import { useState } from 'react'

const ListPerson = ({persons}) => {
  return (
    <>
      {persons.map(x => 
        <div key={x.name}>
          {x.name}
        </div>
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('') // Control the form input element

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    let exist_name = persons.map(x=>x.name)

    if (exist_name.includes(newName)){
      alert (newName + " is already added to phonebook")
    }
    else{
      setPersons(persons.concat({name: newName}))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ListPerson persons={persons} />
    </div>
  )
}

export default App
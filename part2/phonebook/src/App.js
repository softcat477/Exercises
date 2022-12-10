import { useState } from 'react'

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1-234-5678', id:0 }
  ]) 
  const [newName, setNewName] = useState('') // Control the form input element
  const [newNumber, setNewNumber] = useState("")

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <Field text="name" value={newName} onChange={handleNewName} />
        <Field text="number" value={newNumber} onChange={handleNewNumber} />
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
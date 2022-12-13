const express = require("express")
const app = express()
app.use(express.json())

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.json(phonebook)
} )

app.get("/info", (request, response) => {
    const msg = `Phonebook has info for ${phonebook.length} people.`
    const time = new Date() 
    response.send(`<p>${msg}</p><p>${time}</p>`)
} )

app.get("/api/persons/:id", (request, response) => {
    const req_id = Number(request.params.id)
    const req_person = phonebook.find(x => x.id === req_id)
    if (req_person){
        response.json(req_person)
    }
    else{
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const req_id = Number(request.params.id)
    phonebook = phonebook.filter(x => x.id !== req_id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
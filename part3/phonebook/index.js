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

app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body.name || !body.number){
        response.send('Content missing. Get ' + JSON.stringify(body))
    }
    else{
        const new_person = {
            name: body.name,
            number: body.number,
            id:Math.floor(Math.random()*1e5)
        }
        phonebook = phonebook.concat(new_person)
        response.json(new_person)
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
// For env vars defining the database URL and port
require("dotenv").config()

// To MongoDB database
const Person = require("./models/person")

// For REST API
const express = require("express")
const app = express()
app.use(express.json())

// Middleware: Use morgan to log
//   <HTTP method> <endpoint url> <response status> <content length> <response time> <if POST, sent data>
const morgan = require('morgan')
morgan.token("json", function (req, res){return JSON.stringify(req.body)})
app.use(morgan(function (tokens, req, res) {
    let ret_str = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
      ].join(' ')

    if (tokens.method(req, res) === "POST"){
        ret_str = ret_str.concat(" " + tokens.json(req, res))
    }

    return ret_str
  }))

// Middleware: allow CORS
const cors = require("cors")
app.use(cors())

// Middleware: Serve static files from the backend
app.use(express.static("build"))

/*
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
*/

// fetch all and return saved phonebook from MongoDB
app.get("/api/persons", (request, response) => {
    // Return saved phonebook
    Person.find({}).then(phonebook => {
        response.json(phonebook)
    })
} )
// get metadata
app.get("/info", (request, response) => {
    const msg = `Phonebook has info for ${phonebook.length} people.`
    const time = new Date() 
    response.send(`<p>${msg}</p><p>${time}</p>`)
} )
// fetch a person from MongoDB
app.get("/api/persons/:id", (request, response) => {
    const req_id = request.params.id
    Person.findById(req_id).then(person => {
        response.json(person)
    })
})
// Delete a person
app.delete("/api/persons/:id", (request, response) => {
    const req_id = Number(request.params.id)
    phonebook = phonebook.filter(x => x.id !== req_id)

    response.status(204).end()
})
// Add a person
app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body.name || !body.number){
        return response.status(400).json({
            error: 'Content missing.'})
    }
    else{
        if(phonebook.find(x => x.name === body.name)){
            return response.status(400).json({
                error: 'Name must be unique.'})
        }
        const new_person = {
            name: body.name,
            number: body.number,
            id:Math.floor(Math.random()*1e5)
        }
        phonebook = phonebook.concat(new_person)
        response.json(new_person)
    }
})

// Our middleware to handle unknown endpoint
// Need to put this after all routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "unknown endpoint"})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

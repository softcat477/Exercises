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

// fetch all and return saved phonebook from MongoDB
app.get("/api/persons", (request, response) => {
    // Return saved phonebook
    Person.find({}).then(phonebook => {
        response.json(phonebook)
    })
} )
// get metadata by fetching phonebook from MongoDB
app.get("/info", (request, response, next) => {
    Person.find({})
          .then(phonebook => {
            const msg = `Phonebook has info for ${phonebook.length} people.`
            const time = new Date() 
            response.send(`<p>${msg}</p><p>${time}</p>`)
          })
          .catch(error => next(error))
} )
// fetch a person from MongoDB
app.get("/api/persons/:id", (request, response, next) => {
    const req_id = request.params.id
    Person.findById(req_id)
          .then(person => {
                response.json(person)
            })
          .catch(error => next(error))
})
// Delete a person from MongoDB
app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
           .then(result => {
            response.status(204).end()
           })
           .catch(error => next(error))
})
// Add a person to MongoDB
app.post("/api/persons", (request, response, next) => {
    const body = request.body

    const new_person = new Person({
        name: body.name,
        number: body.number,
    })
    new_person.save()
              .then(saved_person => {
                    response.json(saved_person)
                })
              .catch(error => next(error))
})
// Update a person in MongoDB
app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, {new:true})
                .then(updatedPerson => {
                    response.json(updatedPerson)
                })
                .catch(error => next(error))
})

// Middleware to handle unknown endpoint
// Need to put this after all routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "unknown endpoint"})
}
app.use(unknownEndpoint)

// Middleware: Error Handling
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name == "CastError"){
        return response.status(400).send({error: "malformatted id"})
    }
    else if (error.name === "ValidationError") {
        return response.status(400).send({error: error.message})
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

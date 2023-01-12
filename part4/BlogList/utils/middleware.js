// Error handlers are middleware that accept four params
const errorHandler = (error, request, response, next) => {
    console.error("Catched this by error handling middleware")
    console.error(error.name)

    if (error.name === "CastError") {
        return response.status(400).send( { error: "malformatted ID" } )
    }
    else if (error.name === "ValidationError"){
        return response.status(400).json( { error: error.message } )
    }
    else if (error.name === "JsonWebTokenError"){
        return response.status(401).json({error: error.message})
    }

    next (error)
}

// Extract authentication
// Return token from header, must use bearer for the authorization method
const getToken = (request, response, next) => {
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      request.token =  authorization.substring(7)
    }
    else {
        request.token = ""
    }

    next()
}

// Unknown endpoint
const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "unknown endpoint"})
}

module.exports = {
    errorHandler, getToken, unknownEndpoint,
}
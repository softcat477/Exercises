const jwt = require("jsonwebtoken")
const config = require("../utils/config")

// Error handlers are middleware that accept four params
const errorHandler = (error, request, response, next) => {
    if (error.name === "CastError") {
        return response.status(400).send( { error: "malformatted ID" } )
    }
    else if (error.name === "ValidationError"){
        return response.status(400).json( { error: error.message } )
    }
    else if (error.name === "JsonWebTokenError"){
        return response.status(401).json({error: error.message})
    }
    else{
        console.error(error.stack)
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
        request.token = null
    }

    next()
}

const getUserIdFromToken = (request, response, next) => {
    // Token is decoded by middleware
    const token = request.token
    request.userId = null
    if (token !== null){
        const decodedToken = jwt.verify(token, config.SECRET)

        if (!decodedToken.id) {
            // This is not a healthy token, reject it
            return response.status(401).json({error: "token missing or invalid"})
        }
        else{
            request.userId = decodedToken.id
        }
    }
    next()
}

// Unknown endpoint
const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "unknown endpoint"})
}

module.exports = {
    errorHandler, getToken, getUserIdFromToken, unknownEndpoint,
}
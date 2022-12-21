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

    next (error)
}

module.exports = {
    errorHandler
}
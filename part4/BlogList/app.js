const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogRouter = require("./controllers/blog")
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const middleware = require("./utils/middleware")
const config = require("./utils/config")

app.use(cors())
app.use(express.json())
app.use(middleware.getToken)
app.use("/api/blogs", middleware.getUserIdFromToken, blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)
if(config.MODE == "test"){
    // POST http://localhost:8080/api/testing/reset to clear database
    const testingRouter = require("./controllers/testing")
    app.use("/api/testing", testingRouter)
}
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
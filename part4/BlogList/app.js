const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogRouter = require("./controllers/blog")
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const middleware = require("./utils/middleware")

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)
app.use(middleware.errorHandler)

module.exports = app
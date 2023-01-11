const userRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

// Implement a way to create new users by doing an HTTP POST request to address api/users. 
// Users have a username, password and name.
userRouter.post("/", async(request, response) => {
    const {username, name, pwd} = request.body

    // username and pwd should be at leat 3 characters long
    if (username.length < 3 || pwd.length < 3){
        return response.status(400).json({
            error: "username and pwd must be at least 3 characters long"
        })
    }

    // Do not create users with the same username
    const existing_user = await User.findOne({username})
    if (existing_user) {
        return response.status(400).json({
            error: "username must be unique"
        })
    }

    // Get hashed pwd
    const pwd_hash = await bcrypt.hash(pwd, 10)

    // Create a new user
    const user = new User({
        username, name, pwd_hash
    })
    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

// GET to return users
userRouter.get("/", async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = userRouter
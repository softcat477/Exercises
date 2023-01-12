const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/user")
const config = require("../utils/config")

// Login using (1) username and (2) hashed pwd
// 1. Get hashed pwd from DB using username
// 2. Hash the given pwd and compare with the hashed pwd from DB
// 3. Reject if username or given pwd not correct
// 4. Generate a token and return to user
loginRouter.post("/", async (request, response) => {
    const {username, pwd} = request.body
    
    // Get user from db
    const user = await User.findOne({username})

    // Compare two hashed pwd
    const password_correct = user === null ? false : await bcrypt.compare(pwd, user.pwd_hash)

    // Reject if username or pwd is not correct
    if (!(user && password_correct)) {
        return response.status(401).json({
            error: "invalid username or password"
        })
    }

    // Create and return a token
    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, config.SECRET)

    response.status(200).send({token, username:user.username, name: user.name})
})

module.exports = loginRouter
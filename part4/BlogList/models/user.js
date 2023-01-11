const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: String, 
    name: String,
    pwd_hash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // Do not reveal the hashed password
        delete returnedObject.pwd_hash
    }
})

module.exports = mongoose.model("User", userSchema)
const mongoose = require('mongoose')
const logger = require("../utils/logger")
const config = require("../utils/config")

PORT = config.PORT
MONGODB_URL = config.MONGODB_URL

const blogSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

mongoose.connect(MONGODB_URL)
    .then(() => {
        logger.info("Connect to mongus")
    })
    .catch(error => {
        logger.error("Failed to connect to: ", MONGODB_URL)
    })

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
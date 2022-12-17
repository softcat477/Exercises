const mongoose = require('mongoose')
const logger = require("../utils/logger")
const config = require("../utils/config")

PORT = config.PORT
MONGODB_URL = config.MONGODB_URL

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(MONGODB_URL)
    .then(() => {
        logger.info("Connect to mongus")
    })
    .catch(error => {
        logger.error("Failed to connect to: ", MONGODB_URL)
    })

module.exports = Blog
require("dotenv").config()

PORT = process.env.PORT
MONGODB_URL = process.env.NODE_ENV === "test" ?
    process.env.MONGODB_URL_TEST :
    process.env.MONGODB_URL

module.exports = {PORT, MONGODB_URL}
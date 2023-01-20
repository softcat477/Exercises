require("dotenv").config()

PORT = process.env.PORT
MONGODB_URL = process.env.NODE_ENV === "test" ?
    process.env.MONGODB_URL_TEST :
    process.env.MONGODB_URL

SECRET = process.env.SECRET
MODE = process.env.NODE_ENV

module.exports = {PORT, MONGODB_URL, SECRET, MODE}
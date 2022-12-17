const http = require('http')
const config = require("./utils/config")
const app = require("./app")
const logger = require("./utils/logger")

const PORT = config.PORT

const server = http.createServer(app)
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
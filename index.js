/*
Running the program:
$ npm dev <- Runs the program in the development mode
$ npm start <- Runs the program
$ npm test <- runs all the tests
*/
const app = require('./app')
require('dotenv').config()
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
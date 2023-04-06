const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogRouter = require('./contollers/blogs')
const middleware = require('./utils/middlware')
const logger = require('./utils/loggers')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

logger.info('Connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('Connected To MongoDB') 
    })
    .catch((error) => {
        logger.error('Error to connect MongoDB database:', error.message)
    })

    
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
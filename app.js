'use strict'

const config = require('./config')
const path = require('path')
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidation = require('express-validation')
const utils = require('./helpers/utils')
const CustomError = require('./helpers/errors')

// make bluebird default Promise
Promise = require('bluebird')
const mongoose = require('mongoose')
// plugin bluebird promise in mongoose
mongoose.Promise = Promise

// connect with mongodb with auto-reconnect
let mongodbConnectedBefore = false
let mongoOpts = {server: { auto_reconnect: true }}
const connect = () => mongoose.connect(config.database.host, mongoOpts)
connect()

mongoose.connection.on('error', () => console.log('Could not connect to MongoDB'))

mongoose.connection.on('disconnected', () => {
  console.log('Lost MongoDB connection...')
  if (!mongodbConnectedBefore) {
    setTimeout(() => connect(), 3000)
  }
})

mongoose.connection.on('connected', () => {
  mongodbConnectedBefore = true
  console.log('Connection established to MongoDB')
})

mongoose.connection.on('reconnected', () => console.log('Reconnected to MongoDB'))

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Force to close the MongoDB conection')
    process.exit(0)
  })
})

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// log the request
app.use(require('morgan')('combined'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// endpoints
app.use('/api', require('./components'))
app.all('*', (req, res) => res.status(404).send({success: false, response: '404 Not Found'}))

app.use((error, req, res, next) => {
  if (error instanceof expressValidation.ValidationError) {
    error.message = error.errors.map(e => e.messages.map(message => message.split('\"').join(''))).join(' and ')
    error = new CustomError(error, 'ValidationError')
    return res.status(error.status || '500').send(utils.badRequest(error))
  } else {
    return res.status(error.status || '500').send(utils.badRequest(error))
  }
})

app.listen(config.port, () => console.log(`express-boilerplate on port ${config.port}`))

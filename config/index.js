'use strict'

const enviroment = process.env.NODE_ENV || 'development'
const secrets = require('./secrets.json')

var app = {}

app.enviroment = {
  production: false,
  development: false
}

app.enviroment[enviroment] = true

app.db = {}

// DEVELOPMENT
if (app.enviroment.development) {
  app.port = 3000
  app.host = `http://localhost:${app.port}`
  app.database = {
    host: 'localhost:27017/express-boilerplate-dev'
  }
  app['MONGOOSE_DEBUG'] = true
  app.jwtSecret = secrets.jwtSecret
}

// TESTING
if (app.enviroment.test) {
  app.port = 3001
  app.host = `http://localhost:${app.port}`
  app.database = {
    host: 'localhost:27017/express-boilerplate-test'
  }
  app['MONGOOSE_DEBUG'] = true
  app.jwtSecret = secrets.jwtSecret
}

// PRODUCTION PARAMETERS
if (app.enviroment.production) {
  app.port = 3000
  app.host = `http://express-boilerplate.com`
  app.database = {
    host: 'localhost:27017/express-boilerplate'
  }
  app['MONGOOSE_DEBUG'] = false
  app.jwtSecret = secrets.jwtSecret
}

module.exports = app

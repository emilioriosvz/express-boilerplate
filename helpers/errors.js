'use strict'

function CustomError (error, name) {
  if (!error) error = new Error()
  this.name = name || error.name || 'CustomError'
  this.message = error.message || error || 'Unespected Error'
  this.stack = error.stack || (new Error()).stack
}

CustomError.prototype = Object.create(Error.prototype)

CustomError.prototype.constructor = CustomError

module.exports = CustomError

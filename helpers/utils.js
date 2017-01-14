'use strict'

function mongooseToObject (mongooseObject) {
  mongooseObject = mongooseObject.toObject()
  delete mongooseObject['__v']
  if (mongooseObject.password) delete mongooseObject.password

  return mongooseObject
}

function successRequest (response) {
  if (response instanceof Array) {
    response = response.map(r => mongooseToObject(r))
  } else {
    response = mongooseToObject(response)
  }

  return {
    response: response,
    success: true
  }
}

function badRequest (error) {
  let response = {
    response: error,
    success: false
  }

  return response
}

module.exports = {
  mongooseToObject, successRequest, badRequest
}

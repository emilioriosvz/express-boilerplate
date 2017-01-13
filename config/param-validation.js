'use strict'

const Joi = require('joi')

module.exports = {
  createUser: {
    body: {
      name: Joi.string().min(2).max(30),
      lastName: Joi.string().min(2).max(30),
      password: Joi.string().required(),
      email: Joi.string().email().required()
    }
  },
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }
}

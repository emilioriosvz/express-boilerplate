'use strict'

const User = require('./user.model')
const utils = require('../../helpers/utils')

/**
 * Load user and append to req.
 */
function load (req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user
      return next()
    })
    .catch(error => {
      if (!error) error = new Error('Not found. Unespected Error')
      return next(error)
    })
}

/**
 * @name Get user
 * @returns {User}
 */
function get (req, res) {
  let user = utils.successRequest(req.user)
  return res.json(user)
}

/**
 * Create new user
 * @property {Object} req.body - The user.
 * @returns {User}
 */
function create (req, res, next) {
  const user = new User(req.body)

  user.save()
    .then(savedUser => {
      savedUser = utils.successRequest(savedUser)
      return res.json(savedUser)
    })
    .catch(error => {
      return next(error)
    }) // http://mongoosejs.com/docs/middleware.html
}

/**
 * Update existing user
 * @property {Object} req.body - The user.
 * @returns {User}
 */
function update (req, res, next) {
  const user = req.user
  const newUser = req.body

  Object.keys(newUser).forEach(field => {
    user[field] = newUser[field]
  })

  user.save()
    .then(savedUser => {
      let response = utils.successRequest(savedUser)
      res.json(response)
    })
    .catch(error => {
      return next(error)
    })
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list (req, res, next) {
  let limit = 50
  let skip = 0

  if (req.query && req.query.limit) limit = Number(req.query.limit)
  if (req.query && req.query.skip) skip = Number(req.query.skip)

  User.find({}, null, { limit, skip })
    .then(users => {
      let response = utils.successRequest(users)
      res.json(response)
    })
    .catch(error => {
      return next(error)
    })
}

/**
 * Delete user.
 * @returns {User}
 */
function remove (req, res, next) {
  const user = req.user
  user.remove()
    .then(deletedUser => {
      res.json(utils.successRequest(deletedUser))
    })
    .catch(error => {
      return next(error)
    })
}

module.exports = { load, get, create, update, list, remove }

'use strict'

const jwt = require('jsonwebtoken')
const customError = require('../../helpers/errors')
const config = require('../../config/')
const User = require('../user/user.model')
const utils = require('../../helpers/utils')
const Auth = require('./auth.model')

function ensureAuth (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization']
  var secret = config.jwtSecret
  if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          next(error)
        } else {
          Auth.findOne({userId: decoded.userId})
            .then(auth => {
              if (!auth) return next(new customError("The token is not valid. Login again."))
              req.userAuth = decoded
              return next()
            })
            .catch(e => {
              next(error)
            })
        }
      })
  } else {
    let error = new customError("Auth required. No token provided")
    next(error)
  }
}

function ensurePermissions (req, res, next) {
  if (req.user.id === req.userAuth.userId) return next() // owner
  User.findById(req.userAuth.userId)
    .then(user => {
      if (!user || !user.admin) {
        return next(new customError("You are not the owner. Please Login with the correct user before."))
      }
      return next()
    })
    .catch(error => {
      next(new customError(error))
    })
}

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  User.getByEmail(req.body.email)
    .then(user => {
      user.comparePassword(req.body.password, function(err, isMatch) {
          if (err) return next(new customError(err))

          if (isMatch) {
            const token = jwt.sign({
              provider: "email",
              userId: user._id,
              email: user.email
            }, config.jwtSecret);

            const auth = new Auth({
              provider: "email",
              userId: user._id,
              email: user.email,
              token: token
            });

            auth.save()
              .then(savedAuth => {
                savedAuth = utils.successRequest(savedAuth)
                return res.json(savedAuth)
              })
              .catch(e => {
                let error = new customError(e)
                res.status(400).send(error)
              });
          } else { // if no users or invalid password
            return next(new customError('Invalid password'))
          }
      });
    })
    .catch(error => {
      return next(error)
    })
}

module.exports = { login, ensureAuth, ensurePermissions }

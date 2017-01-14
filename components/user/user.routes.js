'use strict'

const express = require('express')
const router = express.Router()
const validate = require('express-validation')
const paramValidation = require('../../config/param-validation')
const userCtrl = require('./user.controller')
const authCtrl = require('../auth/auth.controller')

router.route('/')
  // GET /api/user - Get list of users
  .get(userCtrl.list)

  // POST /api/user - Create new user
  .post(validate(paramValidation.createUser), userCtrl.create)

router.route('/:userId')
  // GET /api/user/:userId - Get user
  .get(userCtrl.get)

  // PUT /api/user/:userId - Update user
  .put(authCtrl.ensureAuth, authCtrl.ensurePermissions, userCtrl.update)

  // DELETE /api/user/:userId - Delete user
  .delete(authCtrl.ensureAuth, authCtrl.ensurePermissions, userCtrl.remove)

// Load user when API with userId route parameter is hit
router.param('userId', userCtrl.load)

module.exports = router

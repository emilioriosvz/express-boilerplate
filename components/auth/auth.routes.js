'use strict'

const express = require('express')
const router = express.Router()
const validate = require('express-validation')
const paramValidation = require('../../config/param-validation')
const authCtrl = require('./auth.controller')

router.route('/')
  .post(validate(paramValidation.login), authCtrl.login)

module.exports = router

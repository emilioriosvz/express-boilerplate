'use strict'

const express = require('express')
const userRoutes = require('./user/user.routes')
const authRoutes = require('./auth/auth.routes')
const router = express.Router()

// GET /health - Check service health
router.get('/health', (req, res) =>
  res.send('OK')
)

// mount user routes at /users
router.use('/user', userRoutes)
router.use('/auth', authRoutes)

module.exports = router

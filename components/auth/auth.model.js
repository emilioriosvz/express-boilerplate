'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const EXPIRES = 13824000 // 3 weeks
const defaultExpirationTime = Date.now() + (EXPIRES * 1000)

var authSchema = new Schema(
  {
    token: { type: String },
    userId: { type: String },
    email: String,
    expireAt: { type: Date, default: defaultExpirationTime, expires: EXPIRES }
  },
  {
    timestamps: true // createdAt and updatedAt
  }
)

module.exports = mongoose.model('Auth', authSchema)

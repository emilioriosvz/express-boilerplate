'use strict'

const customError = require('../../helpers/errors')
const utils = require('../../helpers/utils')
const config = require('../../config/')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

var userSchema = new Schema({
  canAccess: { type: Boolean, default: false },
  name: String,
  lastName: String,
  photo: String,
  admin: { type: Boolean, default: false },
  password: String,
  email: { type: String, required: false, unique: true },
  city: String,
  companions: Number,
  age: Number,
  team: String,
  confirmed: { type: Boolean, default: false }
})

userSchema.pre('save', function (next)  {
    var user = this
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err)

      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        return next()
      })
    })
});

/**
 * Check the password
 * @param {String} candidatePassword - The password to check
 * @returns {Boolean}
 */
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

userSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, customErrorr>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const error = customError('Authentication error')
        return Promise.reject(error);
      });
  }
};

module.exports = mongoose.model('User', userSchema)

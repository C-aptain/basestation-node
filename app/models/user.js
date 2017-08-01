const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  login: String,
  password: String,
  name: String,
  permissions: {
    common: {
      users: Boolean,
    },
    region: {
      create: Boolean,
      update: Boolean,
      remove: Boolean,
      synch: Boolean,
    },
    subnet: {
      create: Boolean,
      update: Boolean,
      remove: Boolean,
      synch: Boolean,
    },
    bsc: {
      create: Boolean,
      update: Boolean,
      remove: Boolean,
      synch: Boolean,
      restart: Boolean,
      toggle: Boolean,
    },
    bsc: {
      create: Boolean,
      update: Boolean,
      remove: Boolean,
      synch: Boolean,
      restart: Boolean,
      toggle: Boolean,
    },
    bsc: {
      create: Boolean,
      update: Boolean,
      remove: Boolean,
      synch: Boolean,
      restart: Boolean,
      toggle: Boolean,
    },
    bsc: {
      create: Boolean,
      update: Boolean,
      remove: Boolean,
      synch: Boolean,
      restart: Boolean,
      toggle: Boolean,
    },
    bsc: {
      create: Boolean,
      update: Boolean,
      remove: Boolean,
      synch: Boolean,
      restart: Boolean,
      toggle: Boolean,
    },
  },
})

module.exports = mongoose.model('User', User)

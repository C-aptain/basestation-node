const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.route('/')

  .post((req, res) => {
    User.findOne({login: req.body.login}, function (err, user) {
      if (user) {
        if (err) {
          res.json({message: 'Cannot find user'})

          return
        }

        if (user.password !== req.body.password) {
          res.json({message: 'Invalid password'})

          return
        }

        res.json(user)
      } else {
        res.json({message: 'Cannot find user'})
      }
    })
  })

module.exports = router
const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.route('/')

  .post((req, res) => {
    var user = new User(req.body)

    user.save(e => {
      if (e) {
        res.send(e)
      }

      res.json({message: 'User created!'})
    })
  })

  .get((req, res) => {
    User.find((e, users) => {
      if (e) {
        e.send(e)
      }

      res.json(users)
    })
  })

router.route('/:id')

  .get((req, res) => {
    User.findById(req.params.id, (e, user) => {
      if (e) {
        res.send(e)
      }

      res.json(user)
    })
  })

  .put((req, res) => {
    User.findById(req.params.id, (e, user) => {
      if (e) {
        res.send(e)
      }

      //update somehow

      user.save((e) => {
        if (e) {
          res.send(e)
        }

        res.json({message: 'User updated!'})
      })
    })
  })

  .delete((req, res) => {
    User.remove({
      _id: req.params.id
    }, (e) => {
      if(e) {
        res.send(e)
      }

      res.json({message: 'User deleted'})
    })
  })

module.exports = router
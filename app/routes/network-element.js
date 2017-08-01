const express = require('express')
const NetworkElement = require('../models/network-element')
const router = express.Router()

router.route('/')

  .post((req, res) => {
    var ne = new NetworkElement(req.body)

    ne.save((e, ne) => {
      if (e) {
        res.send(e)
      }

      res.json({message: 'NetworkElement created!'})

      if (req.body.parentId) {
        NetworkElement.findById(req.body.parentId, (e, parent) => {
          if (e) {
            res.send(e)
          }

          parent.childrenIds = parent.childrenIds || []
          parent.childrenIds.push()
        })
      }
    })
  })

  .get((req, res) => {
    NetworkElement.find((e, nes) => {
      if (e) {
        res.send(e)
      }

      res.json(nes)
    })
  })

router.route('/:id')

  .get((req, res) => {
    NetworkElement.findById(req.params.id, (e, ne) => {
      if (e) {
        res.send(e)
      }

      res.json(ne)
    })
  })

  .put((req, res) => {
    NetworkElement.findById(req.params.id, (e, ne) => {
      if (e) {
        res.send(e)
      }

      //update somehow

      ne.save((e) => {
        if (e) {
          res.send(e)
        }

        res.json({message: 'NetworkElement updated!'})
      })
    })
  })

  .delete((req, res) => {
    NetworkElement.remove({
      _id: req.params.id
    }, (e) => {
      if(e) {
        res.send(e)
      }

      res.json({message: 'NetworkElement deleted'})
    })
  })

module.exports = router
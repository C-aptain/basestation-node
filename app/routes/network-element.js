const NetworkElement = require('../models/network-element')
const mongoose       = require('mongoose')
const express        = require('express')

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
          parent.childrenIds.push(ne._id)
          parent.save()
        })
      }
    })
  })

  .get((req, res) => {
    if (req.query.ids && req.query.ids.length) {
      let ids = req.query.ids.map(id => mongoose.Types.ObjectId(id))

      NetworkElement.find({'_id': {$in: ids}}, (e, nes) => {
        if (e) {
          res.send(e)
        }

        res.json(nes)
      })
    } else {
      let q = {}
      let search = req.query.search
      let type = req.query.type

      if (search) {
        q.name =  new RegExp(search, 'i')
      }

      if (type) {
        q.type = type
      }

      NetworkElement.find(q, (e, nes) => {
        if (e) {
          res.send(e)
        }

        if (search) {

        }

        res.json(nes)
      })
    }
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
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

      if (req.body.parentId) {
        NetworkElement.findById(req.body.parentId, (e, parent) => {
          if (e) {
            res.send(e)
          }

          parent.childrenIds = parent.childrenIds || []
          parent.childrenIds.push(ne._id)
          parent.save()

          res.json({message: 'NetworkElement created!'})
        })
      } else {
        res.json({message: 'NetworkElement created!'})
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
          getSearchCallback(res, nes)
        } else {
          res.json(nes)
        }
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
    NetworkElement.findById(req.params.id, (e, ne) => {
      if (e) {
        res.send(e)
      }

      deleteCallback(res, [ne])
    }).remove().exec()
  })

function getSearchCallback(res, nes) {
  let parentIds = []

  nes.forEach(ne => {
    let id = ne.parentId

    if (!id || parentIds.indexOf(id) !== -1 || nes.find(e => {return e._id == id})) {
      return
    }

    parentIds.push(id)
  })

  if (parentIds.length) {
    let ids = parentIds.map(id => mongoose.Types.ObjectId(id))

    NetworkElement.find({'_id': {$in: ids}}, (e, parents) => {
      if (e) {
        res.send(e)
      }

      parents.forEach(ne => {
        if (nes.find(e => e._id == ne._id)) {
          return
        }

        nes.push(ne)
      })

      getSearchCallback(res, nes)
    })

    return
  }

  res.json(nes)
}

function deleteCallback(res, nes) {
  let childrenIds = []

  nes.forEach(ne => {
    if (!ne || !ne.childrenIds || !ne.childrenIds.length) {
      return
    }

    childrenIds = childrenIds.concat(ne.childrenIds)
  })

  if (childrenIds.length) {
    let ids = childrenIds.map(id => mongoose.Types.ObjectId(id))

    NetworkElement.find({'_id': {$in: ids}}, (e, children) => {
      if (e) {
        res.send(e)
      }

      deleteCallback(res, nes)
    }).remove().exec()
  } else {
    res.json({message: 'NetworkElement deleted'})
  }
}

module.exports = router
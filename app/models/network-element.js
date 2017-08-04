const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NetworkElement = new Schema({
  name: String,
  type: String,
  status: String,

  parentId: String,
  childrenIds: [String],

  host: {
    name: String,
  },
  hostIp: String,
  ip: String,
  mBts: Boolean,
  ip2: String,
  boundId: String,
  cellId: String,
  meta: [
    {
      name: String,
      value: String,
      description: {
        abbreviation: String,
        metaType: String,
        text: String,
        modification: String,
      },
    },
  ],
})

module.exports = mongoose.model('NetworkElement', NetworkElement)

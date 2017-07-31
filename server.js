const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 1337
const mongoose = require('mongoose')
const router = express.Router()
const db = require('./db.js')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.Promise = global.Promise
mongoose.connect(db.url, {useMongoClient: true})

router.use((req, res, next) => {
  console.log('Something is happening.')

  next()
});

router.get('/', (req, res) => {
  res.json({message: 'zdarova! welcome to basestation api!'})
})

const users = require('./app/routes/user')

app.use('/api', router)
app.use('/api/users', users)

app.listen(port)
console.log(`Server is live at ${port}`)
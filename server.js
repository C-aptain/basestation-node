const express    = require('express')
const bodyParser = require('body-parser')
const mongoose   = require('mongoose')
const db         = require('./db.js')

const router = express.Router()
const app    = express()

const port = process.env.PORT || 1337

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

const users          = require('./app/routes/user')
const auth           = require('./app/routes/auth')
const networkElement = require('./app/routes/network-element')

app.use('/api', router)
app.use('/api/users', users)
app.use('/api/login', auth)
app.use('/api/network-elements', networkElement)

app.listen(port)
console.log(`Server is live at ${port}`)
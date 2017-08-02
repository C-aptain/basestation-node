const express    = require('express')
const bodyParser = require('body-parser')
const mongoose   = require('mongoose')
const db         = require('./db.js')

const app = express()

const port = process.env.PORT || 1337

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.Promise = global.Promise
mongoose.connect(db.url, {useMongoClient: true})

app.use((req, res, next) => {
  var oneof = false;
      if(req.headers.origin) {
          res.header('Access-Control-Allow-Origin', req.headers.origin);
          oneof = true;
      }
      if(req.headers['access-control-request-method']) {
          res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
          oneof = true;
      }
      if(req.headers['access-control-request-headers']) {
          res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
          oneof = true;
      }
      if(oneof) {
        console.log(2)
          res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
      }

      next();
})

app.use((req, res, next) => {
  console.log('Something is happening.')

  next()
})

const router = express.Router()

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
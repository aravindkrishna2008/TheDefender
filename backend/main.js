require('./models/User.js')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const requireAuth = require('./middlewares/requireAuth.js')

const mongoUri = 'Enter password'
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const app = express()

app.use(bodyParser.json());
app.use(authRoutes)

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance')
})
mongoose.connection.on('error', (err) => {
  console.error('error connecting to mongo', err)
})

const PORT = 5001

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});

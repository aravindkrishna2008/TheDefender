//models
require('./models/User')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

//routes
const authRoute = require('./routes/authRoutes');

const mongoUri = 'mongodb+srv://Aravind:testpassword@cluster0.ulq7g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const app = express()

app.use(bodyParser.json());
app.use(authRoute)


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
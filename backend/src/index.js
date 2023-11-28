const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()

app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
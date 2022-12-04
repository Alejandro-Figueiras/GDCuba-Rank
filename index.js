const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/', express.static('public'))

app.listen(port, () => {
  console.log(`GD Cuba Rank app listening on port ${port}`)
})
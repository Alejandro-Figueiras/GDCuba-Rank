const express = require('express');
const { gdRequest } = require('./helpers/request-helper');
require('dotenv').config()

const app = express()
const port = process.env.PORT;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use("/req", async(req, res, next) => {
	console.log("asdasd")
    gdRequest(req, "getGJSongInfo", {songID: 693041}, (err, res, body) => {
		console.log("ERROR: " + err)
		console.log("RES: " + res),
		console.log("BODY: " + body)
    })
    next()
})
app.use('/', express.static('public'))
app.listen(port, () => {
    console.log(`GD Cuba Rank app listening on port ${port}`)
})
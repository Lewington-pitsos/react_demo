const express = require('express')

const app = express()

// this is the root directory for the purpose of requiring static files
app.use(express.static('public'))

// this sets the response for the '/' rout
// NOTE: files served MUST have ABSOLOUTE paths (relative to this file, not the root directory defined above)
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))

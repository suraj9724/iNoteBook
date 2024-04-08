const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
const app = express()
const port = 5000

app.use(express.json())
var cors = require('cors')
app.use(cors());
app.use(express.json())
// var bodyParser = require("body-
// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/note', require('./routes/note'))

app.listen(port, () => {
    console.log(`iNoteBook backend listening on port http://localhost:${port}`)
})
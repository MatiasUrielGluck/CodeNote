const express = require('express')
const app = express()
const config = require('./config')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CodeNote');
const foldersRoutes = require('./apiServices/folders/routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/folders', foldersRoutes)

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}...`)
})
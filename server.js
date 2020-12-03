const express = require('express')
const path = require('path')
const app = express()
const api = require('./server/routes/api')
const mongoose = require('mongoose')
//const materialize = require('materialize-css')
mongoose.connect('mongodb://localhost/weatherDB', {useNewUrlParser: true})

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', api)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`UP and running on port ${PORT}`);
})
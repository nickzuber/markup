'use strict'

// ES5 here so we don't have to transpile this
const config = require('./config')
const routes = require('./routes')
// const db = require('./db')
const path = require('path')
const fs = require('fs')
const http = require('http')
const express = require('express')

const app = express()
const server = http.createServer(app)

app.set('view engine', 'jade')
app.set('views', './views')

app.use(express.static(path.join(__dirname, 'public')))

routes(app)

// THIS IS OUT OF DATE WITH THE DEV SERVER

server.listen(config.app.server.port)
console.log(`http server listening on port ${config.app.server.port}...`)

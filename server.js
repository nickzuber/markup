'use strict'

// ES5 here so we don't have to transpile this
const config = require('./config')
const routes = require('./routes')
const path = require('path')
const fs = require('fs')
const http = require('http')
const cors = require('cors')
const express = require('express')
const subdomain = require('express-subdomain')
const bodyParser = require('body-parser')
const RateLimit = require('express-rate-limit')

// Create server
const app = express()
const server = http.createServer(app)

// Connect to db
const db = require('./db')

// Configure views
app.set('view engine', 'jade')
app.set('views', './views')

// Body parser for post requests and CORS
app.use(bodyParser.json())
app.use(cors())

// Rate limiting
app.enable('trust proxy')

// Hook up API subdomain
const api_router = express.Router()
require('./routes/api')(api_router)
app.use(subdomain('api', api_router))
app.use('/api', api_router)

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Add general app router
routes(app)

// Start server
server.listen(config.app.server.port)
console.log(`✓ Running server in ${config.app.env} mode`)
console.log(`✓ http server listening on port ${config.app.server.port}...`)

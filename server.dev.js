'use strict'

// ES5 here so we don't have to transpile this
const config = require('./config')
const routes = require('./routes')
const path = require('path')
const fs = require('fs')
const http = require('http')
const express = require('express')
const subdomain = require('express-subdomain')

// dev server
const webpackConfig = require('./webpack.dev.config')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const compiler = webpack(webpackConfig)

const app = express()
const server = http.createServer(app)

// Connect to db
const db = require('./db')

app.set('view engine', 'jade')
app.set('views', './views')

// Hook up API subdomain
const api_router = express.Router()
require('./routes/api')(api_router)
app.use(subdomain('api', api_router))
app.use('/api', api_router);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.join(__dirname, 'public')))

routes(app)

server.listen(config.app.server.port)
console.log(`http server listening on port ${config.app.server.port}...`)

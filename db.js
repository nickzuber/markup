'use strict'

const mongoose = require('mongoose')
const shortid = require('shortid')


mongoose.connect('mongodb://localhost/markup', {
    useMongoClient: true
})

const connection = mongoose.connection;
connection.on('error', console.error.bind(
	  console, 'mongodb database connection error:'
))

connection.once('open', function() {
    console.log('mongodb database successfully connected')
})


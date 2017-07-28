'use strict'

const mongoose = require('mongoose')
const shortid = require('shortid')
const Schema = mongoose.Schema


const postSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
    unique: true,
    required: true,
  },
  _created: {
    type: Date,
    default: Date.now,
    required: true,
  },
  _owner: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    unique: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Post', postSchema);

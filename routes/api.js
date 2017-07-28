'use strict'

const config = require('../config')
const mongoose = require('mongoose')
const shortid = require('shortid')

const Post = require('../models/post')


module.exports = app => {
  app.get('/posts/:posthash', (req, res) => {
    // Get requested post hash
    const hash = req.params.posthash

    // Attempt to find that post and return the JSON
    Post.findOne({ hash }, function(err, post) {
      if (err) throw err
      return res.json(post)
    })
  })

  app.get('/create', (req, res) => {
    // Collect user IP for rate limiting
    const ip = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress

    // Generate hash and collect content
    const hash = shortid.generate()
    const content = 'Test content'
    const _owner = ip
    
    // Create post
    const test = new Post({ _owner, hash, content })

    // Save post to database
    test.save((err, post) => {
      if (err) {
        return res.json({
          "error": {
            "reason": "Failure to create post.",
            "message": err.toString()
          }
        })
      }
      // Return post if successful
      return res.json(post)
    })
  })
}

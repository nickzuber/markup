'use strict'

const config = require('../config')
const mongoose = require('mongoose')
const shortid = require('shortid')
const RateLimit = require('express-rate-limit')
const Post = require('../models/post')

const apiLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 3,                   // limit each IP to 100 requests per windowMs
  delayAfter: 10,             // begin slowing down responses after the 10th request
  delayMs: 3 * 1000,          // slow down subsequent responses by 3 seconds per request
  message: 'Too many accounts created from this IP, please try again in 15 minutes'
})

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

  app.post('/create', apiLimiter, (req, res) => {
    // Collect user IP for rate limiting
    const ip = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress

    // Generate hash and collect content
    const hash = shortid.generate()
    const content = req.body.content
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

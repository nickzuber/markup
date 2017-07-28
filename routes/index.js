'use strict'

const config = require('../config')
const mongoose = require('mongoose')
const shortid = require('shortid')


module.exports = app => {
  app.get('/**', (req, res) => {
    return res.render('app', {
      user_id: shortid.generate()
    })
  })
}

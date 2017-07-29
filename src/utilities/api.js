'use strict';

import Promise from 'bluebird'
import Config from '../../config'

function request (url, options = {}) {
  if (!window) return

  options.headers = { 'Accept': 'application/json', ...options.headers }
  options.method = options.method || 'GET'
  
  return window.fetch(url, options)
}

function getPost(posthash) {
  return request(`${Config.app.server.apiHostname}/posts/${posthash}`)
    .then(response => response.json())
    .catch(err => { throw err })
}

export default {
  getPost
}
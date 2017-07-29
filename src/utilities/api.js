'use strict';

import Promise from 'bluebird'
import Config from '../../config'

function request (url, options = {}) {
  if (!window) return

  options.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...options.headers
  }
  options.method = options.method || 'GET'
  
  return window.fetch(url, options)
}

function getPost (posthash) {
  return request(`${Config.app.server.apiHostname}/posts/${posthash}`)
    .then(response => {
      if (response.status !== 200) {
        if (response.status === 429) {
          throw new Error('RATE LIMIT HIT - FAILURE TO CREATE POST')
        }
        throw new Error('FAILURE TO CREATE POST')
      }
      return response.json()
    })
    .catch(err => { throw err })
}

function createPost (content) {
  return request(`${Config.app.server.apiHostname}/create`, {
    method: 'POST',
    body: JSON.stringify({
      content: content
    })
  }).then(response => {
    if (response.status !== 200) {
      if (response.status === 429) {
        throw new Error('RATE LIMIT HIT - FAILURE TO CREATE POST')
      }
      throw new Error('FAILURE TO CREATE POST')
    }
    return response.json()
  })
    .catch(err => { throw err })
}

export default {
  getPost,
  createPost,
}
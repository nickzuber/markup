'use strict'

import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import * as reducers from '../reducers'
import createLogger from 'redux-logger'
import { callAPI } from '../middleware/robin-redux-api-middleware'

const logger = createLogger({
  duration: true,
  collapsed: true
})

// @TODO: plugin for webpack/babel to remove the need for `.default`
const reducer = combineReducers(reducers.default)
const store = createStore(
  reducer,
  applyMiddleware(
    thunk,
    callAPI,
    logger
  )
)

export default store

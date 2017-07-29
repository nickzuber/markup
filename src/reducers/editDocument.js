'use strict'

import {
  UPDATE_TEXT,
  REQUEST_FORMATTING,
  RESET_FORMATTING,
  SAVE_DOCUMENT,
  EXPANDED_VIEW,
  FETCH_POST_FROM_HASH,
  CREATE_NEW_POST,
} from '../actions/actionTypes'
import Status from '../middleware/robin-redux-api-middleware/constants/status'

const initialState = {
  text: null,
  format: null,
  fetch_post_status: null,
  fetch_post_text: null,
  save_post_status: null,
  save_post_hash: null,
  date_last_saved: null,
  is_expanded: false,
}

export default function screenReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_TEXT:
      return {
        ...state,
        text: action.text
      }
    case REQUEST_FORMATTING:
      return {
        ...state,
        format: action.format
      }
    case RESET_FORMATTING:
      return {
        ...state,
        format: null
      }
    case SAVE_DOCUMENT:
      return {
        ...state,
        date_last_saved: action.date_last_saved
      }
    case EXPANDED_VIEW:
      return {
        ...state,
        is_expanded: action.is_expanded
      }
    case FETCH_POST_FROM_HASH:
      switch (action.status) {
        case Status.SUCCESS:
          return {
            ...state,
            fetch_post_status: Status.SUCCESS,
            fetch_post_text: action.response && action.response.content
          }
        case Status.FAILURE:
          return {
            ...state,
            fetch_post_status: Status.FAILURE,
            fetch_post_text: null
          }
        case Status.REQUEST:
          return {
            ...state,
            fetch_post_status: Status.REQUEST,
            fetch_post_text: null
          }
      }
    case CREATE_NEW_POST:
      switch (action.status) {
        case Status.SUCCESS:
          return {
            ...state,
            save_post_status: Status.SUCCESS,
            save_post_hash: action.response && action.response.hash,
          }
        case Status.FAILURE:
          return {
            ...state,
            save_post_status: Status.FAILURE,
            save_post_hash: null,
          }
        case Status.REQUEST:
          return {
            ...state,
            save_post_status: Status.REQUEST,
            save_post_hash: null,
          }
      }
    default:
      return state
  }
}

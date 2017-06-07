'use strict';

import {
  UPDATE_TEXT,
  REQUEST_FORMATTING,
  RESET_FORMATTING,
  SAVE_DOCUMENT
} from '../actions/actionTypes';

const initialState = {
  text: null,
  format: null,
  date_last_saved: null
};

export default function screenReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_TEXT:
      return {
        ...state,
        text: action.text
      };
    case REQUEST_FORMATTING:
      return {
        ...state,
        format: action.format
      };
    case RESET_FORMATTING:
      return {
        ...state,
        format: null
      };
    case SAVE_DOCUMENT:
      return {
        ...state,
        date_last_saved: action.date_last_saved
      };
    default:
      return state;
  }
};

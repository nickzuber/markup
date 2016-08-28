'use strict';

import {
  UPDATE_TEXT
} from '../actions/actionTypes';

const initialState = {
  text: null
};

export default function screenReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_TEXT:
      return {
        ...state,
        text: action.text
      };
    default:
      return state;
  }
};

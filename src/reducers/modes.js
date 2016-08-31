'use strict';

import {
  BANNER_SHOW_FULL,
  BANNER_SHOW_SHORT,
  BANNER_SHOW_HIDDEN
} from '../actions/actionTypes';
import {Mode} from '../components/banner';

const initialState = {
  banner: null
};

export default function modesReducer(state = initialState, action) {
  switch(action.type) {
    case BANNER_SHOW_FULL:
      return {
        ...state,
        banner: Mode.FULL
      };
    case BANNER_SHOW_SHORT:
      return {
        ...state,
        banner: Mode.SHORT
      };
    case BANNER_SHOW_HIDDEN:
      return {
        ...state,
        banner: Mode.HIDDEN
      };
    default:
      return state;
  }
};

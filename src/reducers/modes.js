'use strict';

import {
  BANNER_SHOW_FULL,
  BANNER_SHOW_SHORT,
  BANNER_SHOW_HIDDEN,
  POPUP_HIDE_ALL,
  POPUP_RESET,
  UNLOAD_PAGE,
  LOAD_PAGE
} from '../actions/actionTypes';
import {Mode} from '../components/banner';

const initialState = {
  banner: null,
  popups: true,
  appLoaded: true
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
    case POPUP_HIDE_ALL:
      return {
        ...state,
        popups: false
      };
    case POPUP_RESET:
      return {
        ...state,
        popups: true
      };
    case UNLOAD_PAGE:
      return {
        ...state,
        appLoaded: false
      };
    case LOAD_PAGE:
      return {
        ...state,
        appLoaded: true
      };
    default:
      return state;
  }
};

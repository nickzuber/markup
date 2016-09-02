'use strict';

import {
  UPDATE_TEXT,
  BANNER_SHOW_FULL,
  BANNER_SHOW_SHORT,
  BANNER_SHOW_HIDDEN,
  POPUP_HIDE_ALL,
  POPUP_RESET
} from './actionTypes';

export function updateText (text) {
  return {
    type: UPDATE_TEXT,
    text
  };
};

export function showFullBanner () {
  return {
    type: BANNER_SHOW_FULL
  };
}

export function showShortBanner () {
  return {
    type: BANNER_SHOW_SHORT
  };
}

export function hideBanner () {
  return {
    type: BANNER_SHOW_HIDDEN
  };
}

export function resetPopups () {
  return {
    type: POPUP_RESET
  };
}

export function hideAllPopups () {
  return {
    type: POPUP_HIDE_ALL
  };
}

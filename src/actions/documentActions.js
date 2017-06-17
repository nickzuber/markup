'use strict';

import {
  UPDATE_TEXT,
  BANNER_SHOW_FULL,
  BANNER_SHOW_SHORT,
  BANNER_SHOW_HIDDEN,
  POPUP_HIDE_ALL,
  POPUP_RESET,
  REQUEST_FORMATTING,
  RESET_FORMATTING,
  SAVE_DOCUMENT,
  EXPANDED_VIEW
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

export function requestFormatting (format) {
  return {
    type: REQUEST_FORMATTING,
    format
  };
}

export function resetFormatting () {
  return {
    type: RESET_FORMATTING
  };
}

export function saveDocument (date_last_saved) {
  return {
    type: SAVE_DOCUMENT,
    date_last_saved
  };
}

export function expandDocument (is_expanded) {
  return {
    type: EXPANDED_VIEW,
    is_expanded
  };
}

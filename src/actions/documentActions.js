'use strict';

import {
  UPDATE_TEXT,
  BANNER_SHOW_FULL,
  BANNER_SHOW_SHORT,
  BANNER_SHOW_HIDDEN
} from './actionTypes';

export function updateDocumentText (text) {
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

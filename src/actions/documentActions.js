'use strict';

import {UPDATE_TEXT} from './actionTypes';

export function updateDocumentText (text) {
  return {
    type: UPDATE_TEXT,
    text
  };
};

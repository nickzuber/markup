'use strict';

import {
  UNLOAD_PAGE,
  LOAD_PAGE
} from './actionTypes';

export function loadPage () {
  return {
    type: LOAD_PAGE
  };
}

export function unloadPage () {
  return {
    type: UNLOAD_PAGE
  };
}

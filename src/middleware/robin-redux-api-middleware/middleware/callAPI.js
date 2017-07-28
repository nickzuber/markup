'use strict';
import Constants from '../constants';

const Status = Constants.Status;

/**
 * Middleware that looks for a 'callAPI' property on the action.
 *
 * callAPI should be a function with parameters: (state, optimizedParams).
 * Dispatches the action twice: once with an appended status of 'request', then
 * again with an appended status based on the result of running the `callAPI` function.
 */
function callAPI({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      const {
        type,
        callAPI,
        shouldCallAPI = () => true,
        payload = {}
      } = action;

      if (typeof shouldCallAPI !== 'function') {
        return Promise.reject(new Error('Not calling API: shouldCallAPI was not a function.'));
      }

      if (typeof callAPI !== 'function') {
        // Normal action: pass it on
        return next(action);
      }

      if (!shouldCallAPI(getState())) {
        return Promise.reject(new Error('Not calling API: shouldCallAPI flag was set as false.'));
      }

      dispatch({
        ...payload,
        type,
        status: Status.REQUEST
      });

      const dispatchError = error => dispatch({
        ...payload,
        error,
        type,
        status: Status.FAILURE
      });

      const dispatchSuccess = response => dispatch({
        ...payload,
        response,
        type,
        status: Status.SUCCESS
      });

      return callAPI(getState()).then(
        dispatchSuccess,
        dispatchError
      );
    };
  };
}

export default callAPI;

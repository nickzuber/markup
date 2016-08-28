'use strict';

/**
 * This middleware is derived from the smart folks over at Robin Powered.
 * https://robinpowered.com/
 */

export const Status = {
  REQUEST: 'request',
  SUCCESS: 'success',
  FAILURE: 'failure',
}

/**
 * Middleware that looks for a 'callAPI' property on the action.
 * 
 * callAPI should be a function with parameters: (state, optimizedParams).
 * Dispatches the action twice: once with an appended status of 'request', then
 * again with an appended status based on the result of running the `callAPI` function.
 */
 export default function callAPI({ dispatch, getState }) {
   return function (next) {
     return function (action) {
       const {
         type,
         callAPI,
         shouldCallAPI = () => true,
         payload = {},
         optimizeParams
       } = action;

       if (typeof callAPI !== 'function') {
         // Normal action: pass it on
         return next(action);
       }

       var optimizedParams;
       if (typeof optimizeParams === 'function') {
         optimizedParams = optimizeParams(getState());
       }

       if (!shouldCallAPI(getState(), optimizedParams)) {
         return Promise.reject(new Error('Not calling API: shouldCallAPI flag was set as false.'))
                       .catch(e => console.warn('Gracefully catching and dropping rejected promise from refusing to call API.'));
       }

       dispatch(Object.assign({}, payload, {
         type,
         status: Status.REQUEST
       }));

       const dispatchError = error => dispatch(Object.assign({}, payload, {
         error: error,
         type,
         status: Status.FAILURE
       }));

       const dispatchSuccess = response => dispatch(Object.assign({}, payload, {
         response: response,
         type,
         status: Status.SUCCESS
       }));

       return callAPI(getState(), optimizedParams).then(
         dispatchSuccess,
         dispatchError
       );
     };
   };
 }

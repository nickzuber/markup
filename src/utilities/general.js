'use strict';

/**
 * Merges an array of objects together, where the second object overrides any conflicting keys. This
 * method does not alter the input objects.
 *
 * @param  {array}  objs Array of objects to merge.
 * @return {object}      Merged object of the input objects.
 */
export function merge(objs) {
  var res = {};
  objs.map(obj => {
    Object.keys(obj).map(e => res[e] = obj[e]);
  });
  return res;
};

/**
 * Takes three inputs and determines if the input is within range of the bounds. Inclusive.
 * @param  {number}  input      [description]
 * @param  {number}  lowerBound [description]
 * @param  {number}  upperBound [description]
 * @return {boolean}           Whether or not input is within range of the bounds.
 */
export function withinRange(input, lowerBound, upperBound) {
  return (input >= lowerBound && input <= upperBound);
};

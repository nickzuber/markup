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

export function addClass (elem, name) {
  elem.className += ` ${name}`;
  return elem;
}

export function removeClass (elem, name) {
  var classList = elem.className.split(' ');
  elem.className = classList.filter(n => n !== name).join(' ');
  return elem;
}

/**
 * Generates a random string.
 */
export function generatePid(){
  var length = Math.floor(Math.random() * 10) + 10;
  var mask = '.abcdefghijklmnopqrstuvwxyz';
  mask += '.ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  mask += '.0123456789';
  var result = '';
  for(var i=length; i> 0; --i)
    result += mask[Math.round(Math.random() * (mask.length - 1))];
  return result;
}

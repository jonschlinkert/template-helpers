'use strict';

var forIn = require('for-in');
var typeOf = require('kind-of');
var get = require('get-value');

/**
 * Stringify an object using `JSON.stringify()`.
 *
 * @param  {Object} `object`
 * @return {String}
 * @api public
 */

exports.stringify = function stringify(o) {
  return JSON.stringify(o);
};

/**
 * Returns true if `object` has own property `key`.
 *
 * @param  {Object} `object`
 * @param  {String} `key`
 * @return {Boolean}
 * @api public
 */

exports.hasOwn = function hasOwn(o, key) {
  return {}.hasOwnProperty.call(o, key);
};

/**
 * Stringify an object using `JSON.stringify()`.
 *
 * @param  {Object} `object`
 * @return {String}
 * @api public
 */

exports.get = function get_(o, prop) {
  return get.apply(get, arguments);
};

/**
 * Returns the keys on the give `object`.
 *
 * @param  {Object} `obj`
 * @return {Array} Keys from `obj`
 * @api public
 */

exports.keys = function keys(obj) {
  return Object.keys(obj);
};

/**
 * Return true if the given `value` is an object with keys.
 *
 * ```js
 * <%= isObject(['a', 'b', 'c']) %>
 * //=> 'false'
 *
 * <%= isObject({a: 'b'}) %>
 * //=> 'true'
 * ```
 *
 * @param  {Object} `value` The value to check.
 * @return {Boolean}
 * @api public
 */

exports.isObject = function isObject(val) {
  return typeOf(val) === 'object' && typeOf(val) !== 'regexp';
};

/**
 * Iterate over the own and inherited enumerable properties
 * of an object, and return an object with properties that
 * evaluate to true from the callback. Exit early by returning
 * `false`.
 *
 * @param  {Object} `object` The object to iterate over.
 * @param  {Function} `fn` Callback function.
 * @param  {Object} `thisArg` Context in which to execute the callback.
 * @return {Object}
 * @api public
 */

exports.forIn = function forIn(o, fn, thisArg) {
  for (var key in o) {
    if (fn.call(thisArg, o[key], key, o) === false) {
      break;
    }
  }
};

/**
 * Iterate over the own enumerable properties of an object, and
 * return an object with properties that evaluate to true from
 * the callback. Exit early by returning `false`
 *
 * @param  {Object} `object` The object to iterate over.
 * @param  {Function} `fn` Callback function.
 * @param  {Object} `thisArg` Context in which to execute the callback.
 * @return {Object}
 * @api public
 */

exports.forOwn = function forOwn(o, fn, thisArg) {
  forIn(o, function (val, key) {
    if (exports.hasOwn(o, key)) {
      return fn.call(thisArg, o[key], key, o);
    }
  });
};

/**
 * Extend `o` with properties of other `objects`.
 *
 * @param  {Object} `o` The target object. Pass an empty object to shallow clone.
 * @param  {Object} `objects`
 * @return {Object}
 * @api public
 */

exports.extend = function extend(o) {
  if (typeOf(o) !== 'object') { return ''; }
  var args = arguments;
  var len = args.length - 1;

  for (var i = 0; i < len; i++) {
    var obj = args[i + 1];

    if (typeOf(obj) === 'object') {
      for (var key in obj) {
        if (exports.hasOwn(obj, key)) {
          o[key] = obj[key];
        }
      }
    }
  }
  return o;
};

/**
 * Recursively combine the properties of `o` with the
 * properties of other `objects`.
 *
 * @param  {Object} `o` The target object. Pass an empty object to shallow clone.
 * @param  {Object} `objects`
 * @return {Object}
 * @api public
 */

exports.merge = function merge(o) {
  if (typeOf(o) !== 'object') { return ''; }
  var args = arguments;
  var len = args.length - 1;

  for (var i = 0; i < len; i++) {
    var obj = args[i + 1];

    if (typeOf(obj) === 'object') {
      for (var key in obj) {
        if (exports.hasOwn(obj, key)) {
          if (typeOf(obj[key]) === 'object') {
            o[key] = exports.merge(o[key], obj[key]);
          } else {
            o[key] = obj[key];
          }
        }
      }
    }
  }
  return o;
};
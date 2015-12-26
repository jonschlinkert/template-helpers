'use strict';

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Utils
 */

require('any');
require('arr-flatten', 'flatten');
require('center-align', 'alignCenter');
require('get-value', 'get');
require('is-absolute');
require('is-number');
require('is-plain-object');
require('isobject', 'isObject');
require('kind-of', 'typeOf');
require('object.omit', 'omit');
require('relative');
require('right-align', 'alignRight');
require('strip-indent');
require('to-gfm-code-block', 'block');
require('word-wrap', 'wrap');
require = fn;

/**
 * Stringify HTML tag attributes from the given `object`.
 *
 * @param {Object} `object` Object of attributes as key-value pairs.
 * @return {String} Stringified attributes, e.g. `foo="bar"`
 * @api public
 */

utils.toAttributes = function(obj) {
  return Object.keys(obj).map(function(key) {
    return key + '="' + obj[key] + '"';
  }).join(' ');
};

/**
 * Generate a random number
 *
 * @param  {Number} `min`
 * @param  {Number} `max`
 * @return {Number}
 */

utils.random = function(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

/**
 * Expose `utils` modules
 */

module.exports = utils;

'use strict';

/**
 * Stringify HTML tag attributes from the given `object`.
 *
 * @param {Object} `object` Object of attributes as key-value pairs.
 * @return {String} Stringified attributes, e.g. `foo="bar"`
 * @api public
 */

exports.toAttributes = function toAttributes(obj) {
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

exports.random = function random(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

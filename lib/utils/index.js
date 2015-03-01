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

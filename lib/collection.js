'use strict';

var any = require('any');

/**
 * Returns `true` if `value` exists in the given string, array
 * or object. See [any] for documentation.
 *
 * @param {*} `value`
 * @param {*} `target`
 * @param {Object} `options`
 * @api public
 */

exports.any = function any_(value, target) {
  return any.apply(any, arguments);
};

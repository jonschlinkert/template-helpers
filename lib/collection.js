'use strict';

var lazy = require('lazy-cache')(require);
lazy('any');

/**
 * Returns `true` if `value` exists in the given string, array
 * or object. See [any] for documentation.
 *
 * @param {*} `value`
 * @param {*} `target`
 * @param {Object} `options`
 * @api public
 */

exports.any = function any(value, target) {
  return lazy.any.apply(lazy.any, arguments);
};

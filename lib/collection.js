'use strict';

var utils = require('./utils');

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
  return utils.any.apply(utils.any, arguments);
};

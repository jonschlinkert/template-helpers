'use strict';

const utils = require('../utils');

/**
 * Return the product of `a` plus `b`.
 *
 * ```js
 * <%= add(1, 2) %>
 * //=> '3'
 * ```
 * @param {Number} `a`
 * @param {Number} `b`
 * @api public
 */

exports.add = (a, b) => a + b;

/**
 * Subtract `b` from `a`.
 *
 * ```js
 * <%= subtract(5, 2) %>
 * //=> '3'
 * ```
 * @param {Number} `a`
 * @param {Number} `b`
 * @api public
 */

exports.subtract = (a, b) => Number(a) - Number(b);

/**
 * Divide `a` (the numerator) by `b` (the divisor).
 *
 * ```js
 * <%= divide(10, 2) %>
 * //=> '5'
 * ```
 * @param {Number} `a` the numerator.
 * @param {Number} `b` the divisor.
 * @return {Number} The quotient of `a` divided by `b`.
 * @api public
 */

exports.divide = (a, b) => Number(a) / Number(b);

/**
 * Multiply `a` by `b`.
 *
 * ```js
 * <%= divide(10, 2) %>
 * //=> '5'
 * ```
 * @param {Number} `a`
 * @param {Number} `b`
 * @return {Number} The product of `a` times `b`.
 * @api public
 */

exports.multiply = (a, b) => Number(a) * Number(b);

/**
 * Returns the largest integer less than or equal to the
 * given `number`.
 *
 * ```js
 * <%= floor(10.6) %>
 * //=> '10'
 * ```
 * @param {Number} `number`
 * @return {Number}
 * @api public
 */

exports.floor = n => Math.floor(n);

/**
 * Returns the smallest integer greater than or equal to the
 * given `number`.
 *
 * ```js
 * <%= ceil(10.1) %>
 * //=> '11'
 * ```
 * @param {Number} `number`
 * @return {Number}
 * @api public
 */

exports.ceil = n => Math.ceil(n);

/**
 * Returns the value of the given `number` rounded to the
 * nearest integer.
 *
 * ```js
 * <%= round(10.1) %>
 * //=> '10'
 *
 * <%= round(10.5) %>
 * //=> '11'
 * ```
 * @param {Number} `number`
 * @return {Number}
 * @api public
 */

exports.round = n => Math.round(n);

/**
 * Returns the sum of all numbers in the given array.
 *
 * ```js
 * <%= sum([1, 2, 3, 4, 5]) %>
 * //=> '15'
 * ```
 * @param {Number} `number`
 * @return {Number}
 * @api public
 */

exports.sum = (...args) => {
  let arr = [].concat.apply([], args);
  let len = arr.length;
  let idx = -1;
  let num = 0;

  while (++idx < len) {
    if (!utils.isNumber(arr[idx])) {
      continue;
    }
    num += (+arr[idx]);
  }
  return num;
};

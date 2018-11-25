'use strict';

/**
 * Returns true when both `valueA` and `valueB` are truthy.
 *
 * @name .and
 * @param {any} `valueA`
 * @param {any} `valueB`
 * @return {Boolean}
 * @api public
 */

exports.and = (valueA, valueB) => !!valueA && !!valueB;

/**
 * Render a block when a comparison of the first and third arguments
 * returns true.
 *
 * ```js
 * <%= compare("foo", "!==", "bar") %>
 * ```
 * @name .compare
 * @param {String} `valueA`
 * @param {String} `operator` The operator to use for the comparison (must be a quoted string).
 * @param {String} `valueB`
 * @return {Boolean}
 * @api public
 */

exports.compare = function(a, operator, b) {
  /* eslint-disable eqeqeq */

  if (arguments.length < 3) {
    throw new Error('"compare" helper - expected 3 arguments');
  }

  switch (operator) {
    case '!=':
      return a != b;
    case '!==':
      return a !== b;
    case '<':
      return a < b;
    case '<=':
      return a <= b;
    case '==':
      return a == b;
    case '===':
      return a === b;
    case '>':
      return a > b;
    case '>=':
      return a >= b;
    case 'typeof':
      return typeof a === b;
    default: {
      throw new Error(`"compare" helper - invalid operator: "${operator}"`);
    }
  }
  return false;
};

/**
 * Returns the first truthy value.
 *
 * @name .find
 * @param {...args} `...values`
 * @return {any}
 * @api public
 */

exports.find = (...values) => values.find(v => !!v);

/**
 * Returns true when all provided values are truthy.
 *
 * @name .every
 * @param {...any} `...values`
 * @return {Boolean}
 * @api public
 */

exports.every = (...args) => {
  for (let ele of args) if (!ele) return false;
  return true;
};

/**
 * Returns true when `valueA` is greater than `valueB`.
 *
 * @name .gt
 * @param {String} `valueA`
 * @param {String} `valueB`
 * @return {Boolean}
 * @api public
 */

exports.gt = (a, b) => a > b;

/**
 * Returns true when `valueA` is greater than or equal to `valueB`.
 *
 * @name .gte
 * @param {String} `valueA`
 * @param {String} `valueB`
 * @return {Boolean}
 * @api public
 */

exports.gte = (a, b) => a >= b;

/**
 * Return true if `key` is an own, enumerable property
 * of the given `obj`.
 *
 * @param  {Object} `object`
 * @param  {String} `key`
 * @return {Boolean}
 * @api public
 */

exports._if = function if_(fn, a, b, thisArg) {
  if (typeof fn !== 'function') return '';

  thisArg = thisArg || this || null;
  let res = fn.call(thisArg, a, b);
  if (res) return a;
  return b;
};

/**
 * Returns true when `valueA` equals `valueB`.
 *
 * @name .is
 * @param {String} `valueA`
 * @param {String} `valueB`
 * @param {String} `strict`
 * @return {Boolean}
 * @api public
 */

exports.is = (a, b, strict = true) => {
  return strict ? a === b : a == b;
};

/**
 * Alias for [is](#is).
 *
 * @name .eq
 * @param {String} `valueA`
 * @param {String} `valueB`
 * @param {String} `strict`
 * @return {Boolean}
 * @api public
 */

exports.eq = exports.is;

/**
 * Returns true when `valueA` does not equal `valueB`.
 *
 * @name .isnt
 * @param {String} `valueA`
 * @param {String} `valueB`
 * @return {Boolean}
 * @api public
 */

exports.isnt = (a, b, strict = true) => {
  return strict ? a !== b : a != b;
};

/**
 * Alias for [isnt](#isnt).
 *
 * @name .notEq
 * @param {String} `valueA`
 * @param {String} `valueB`
 * @return {Boolean}
 * @api public
 */

exports.notEq = exports.isnt;

/**
 * Returns true when `valueA` is less than `valueB`.
 *
 * @name .lt
 * @param {String} `valueA`
 * @param {String} `valueB`
 * @return {Boolean}
 * @api public
 */

exports.lt = (a, b) => a < b;

/**
 * Returns true when `valueA` is less than or equal to `valueB`.
 *
 * @name .lte
 * @param {String} `valueA`
 * @param {String} `valueB`
 * @return {Boolean}
 * @api public
 */

exports.lte = (a, b) => a <= b;

/**
 * Returns `valueA` if thruthy, otherwise `valueB`.
 *
 * @name .or
 * @param {any} `valueA`
 * @param {any} `valueB`
 * @return {any}
 * @api public
 */

exports.or = (valueA, valueB) => !!valueA ? valueA : valueB;

/**
 * Returns true when at least one value is truthy.
 *
 * @name .some
 * @param {...any} `...values`
 * @return {Boolean}
 * @api public
 */

exports.some = (...args) => {
  for (let ele of args) if (!!ele) return true;
  return false;
};

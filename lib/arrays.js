'use strict';

var isNumber = require('is-number');

/**
 * Returns the first item, or first `n` items of an array.
 *
 * @param {Array} `array`
 * @param {Number} `n` Number of items to return, starting at `0`.
 * @return {Array}
 * @api public
 */

exports.first = function first(arr, n) {
  if (!isNumber(n)) {
    return arr[0];
  } else {
    return arr.slice(0, n);
  }
};

/**
 * Returns the last item, or last `n` items of an array.
 *
 * @param {Array} `array`
 * @param {Number} `n` Number of items to return, starting with the last item.
 * @return {Array}
 * @api public
 */

exports.last = function last(arr, n) {
  if (!isNumber(n)) {
    return arr[arr.length - 1];
  } else {
    return arr.slice(-n);
  }
};

/**
 * Returns all of the items in an array up to the specified number
 * Opposite of `{{after}}`.
 *
 * @param {Array} `array`
 * @param {Number} `n`
 * @return {Array} Array excluding items after the given number.
 * @crosslink after
 * @api public
 */

exports.before = function before(arr, n) {
  return arr.slice(0, -n);
};

/**
 * Returns all of the items in an arry after the specified number.
 *
 * @param {Array} `array` Collection
 * @param {Number} `n` Number of items to exclude
 * @return {Array} Array exluding items before the given number.
 * @crosslink before
 * @api public
 */

exports.after = function after(arr, n) {
  return arr.slice(n);
};

/**
 * Join all elements of array into a string, optionally using a
 * given separator.
 *
 * @param {Array} `array`
 * @param {String} `sep` The separator to use.
 * @return {String}
 * @api public
 */

exports.join = function join(arr, sep) {
  sep = typeof sep === 'string' ? sep : ', ';
  return arr.join(sep);
};

/**
 * Sort the given `array`. If an array of objects is passed,
 * you may optionally pass a `key` to sort on as the second
 * argument. You may alternatively pass a sorting function as
 * the second argument.
 *
 * ```js
 * <%= sort(['b', 'a', 'c']) %>
 * //=> ['a', 'b', 'c']
 *
 * <%= sort([{a: 'c'}, {a: 'a'}], 'a') %>
 * //=> [{a: 'a'}, {a: 'c'}]
 * ```
 *
 * @param {Array} `array` the array to sort.
 * @param {String|Function} `key` The object key to sort by, or sorting function.
 */

exports.sort = function sort(arr, key) {
  if (typeof key === 'function') {
    return arr.sort(key);
  }
  if (typeof key !== 'string') {
    return arr.sort();
  }
  return arr.sort(function(a, b) {
    return a[key] > b[key];
  });
};

/**
 * Returns the length of the given array.
 *
 * ```js
 * <%= length(['a', 'b', 'c']) %>
 * //=> 3
 * ```
 *
 * @param  {Array} `array`
 * @return {Number} The length of the array.
 */

exports.length = function length(arr) {
  return !Array.isArray(arr) ? 0 : arr.length;
};

/**
 * Converts a string such as "foo, bar, baz" to an ES Array of strings.
 *
 * ```js
 * <%= toArray('a,b,c') %>
 * //=> ["a", "b", "c"]
 * ```
 *
 * @param {String} `str`
 * @return {Array}
 * @api public
 */

exports.toArray = function toArray(str) {
  return str.split(',').map(function(ele) {
    return '"' + ele + '"';
  });
};

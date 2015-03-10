'use strict';

var isNumber = require('is-number');
var unique = require('array-unique');
var diff = require('arr-diff');
var map = require('arr-map');

/**
 * Returns true if `value` is an array.
 *
 * ```js
 * <%= isArray('a, b, c') %>
 * //=> 'false'
 *
 * <%= isArray(['a, b, c']) %>
 * //=> 'true'
 * ```
 *
 * @param {*} `value` The value to test.
 * @return {Boolean}
 * @api public
 */

exports.isArray = function isArray(val) {
  return Array.isArray(val);
};

/**
 * Cast `val` to an array.
 *
 * ```js
 * <%= arrayify('a') %>
 * //=> '['a']'
 *
 * <%= arrayify({a: 'b'}) %>
 * //=> '[{a: "b"}]'
 *
 * <%= arrayify(['a')] %>
 * //=> '['a']'
 * ```
 *
 * @param  {*} `val` The value to arrayify.
 * @return  {Array} An array.
 * @return {Array}
 */

exports.arrayify = function arrayify(val){
  return Array.isArray(val) ? val : [val];
};

/**
 * Returns the first item, or first `n` items of an array.
 *
 * ```js
 * <%= first(['a', 'b', 'c', 'd', 'e'], 2) %>
 * //=> ['a', 'b']
 * ```
 *
 * @param {Array} `array`
 * @param {Number} `n` Number of items to return, starting at `0`.
 * @return {Array}
 * @api public
 */

exports.first = function first(arr, n) {
  if (!arr || arr.length === 0) {
    return '';
  }

  if (!isNumber(n)) {
    return arr[0];
  } else {
    return arr.slice(0, n);
  }
};

/**
 * Returns the last item, or last `n` items of an array.
 *
 * ```js
 * <%= last(['a', 'b', 'c', 'd', 'e'], 2) %>
 * //=> ['d', 'e']
 * ```
 *
 * @param {Array} `array`
 * @param {Number} `n` Number of items to return, starting with the last item.
 * @return {Array}
 * @api public
 */

exports.last = function last(arr, n) {
  if (!arr || arr.length === 0) {
    return '';
  }
  if (!isNumber(n)) {
    return arr[arr.length - 1];
  } else {
    return arr.slice(-n);
  }
};

/**
 * Returns all of the items in an array up to the specified number
 * Opposite of `<%= after() %`.
 *
 * ```js
 * <%= before(['a', 'b', 'c'], 2) %>
 * //=> ['a', 'b']
 * ```
 *
 * @param {Array} `array`
 * @param {Number} `n`
 * @return {Array} Array excluding items after the given number.
 * @crosslink after
 * @api public
 */

exports.before = function before(arr, n) {
  if (!arr || arr.length === 0) {
    return '';
  }
  return arr.slice(0, -n);
};

/**
 * Returns all of the items in an arry after the specified index.
 * Opposite of `<%= before() %`.
 *
 * ```js
 * <%= after(['a', 'b', 'c'], 1) %>
 * //=> ['c']
 * ```
 *
 * @param {Array} `array` Collection
 * @param {Number} `n` Starting index (number of items to exclude)
 * @return {Array} Array exluding `n` items.
 * @crosslink before
 * @api public
 */

exports.after = function after(arr, n) {
  if (!arr || arr.length === 0) {
    return '';
  }
  return arr.slice(n);
};

/**
 * Returns a new array, created by calling `function`
 * on each element of the given `array`.
 *
 * ```js
 * function double(str) {
 *   return str + str;
 * }
 * ```
 *
 * Assuming that `double` has been registered as a helper:
 *
 * ```js
 * <%= map(['a', 'b', 'c'], double) %>
 * //=> 'aa,bb,cc'
 * ```
 *
 * @param {Array} `array`
 * @param {String} `fn` The function to
 * @return {String}
 * @api public
 */

exports.map = function(arr, fn) {
  if (!arr || !Array.isArray(arr)) return '';
  return map(arr, fn);
};

/**
 * Join all elements of array into a string, optionally using a
 * given separator.
 *
 * ```js
 * <%= join(['a', 'b', 'c']) %>
 * //=> 'a, b, c'
 *
 * <%= join(['a', 'b', 'c'], '-') %>
 * //=> 'a-b-c'
 * ```
 *
 * @param {Array} `array`
 * @param {String} `sep` The separator to use.
 * @return {String}
 * @api public
 */

exports.join = function join(arr, sep) {
  if (!arr || arr.length === 0) {
    return '';
  }
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
  if (!arr || arr.length === 0) {
    return '';
  }
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
  if (!arr || arr.length === 0) {
    return '';
  }
  return Array.isArray(arr) ? arr.length : 0;
};

/**
 * Returns an array with all falsey values removed.
 *
 * ```js
 * <%= compact([null, a, undefined, 0, false, b, c, '']) %>
 * //=> [a, b, c]
 * ```
 *
 * @param {Array} `arr`
 * @return {Array}
 * @api public
 */

exports.compact = function compact(arr) {
  if (!arr || arr.length === 0) {
    return '';
  }
  return arr.filter(Boolean);
};

/**
 * {%= apidocs(node_modules('arr-diff')) %}
 * @api public
 * @noname
 */

exports.difference = diff;

/**
 * {%= apidocs(node_modules('array-unique')) %}
 * @api public
 * @noname
 */

exports.unique = unique;

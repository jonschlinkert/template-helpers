'use strict';

const object = require('./object');
const utils = require('../utils');

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
 * @param {*} `value` The value to test.
 * @return {Boolean}
 * @api public
 */

exports.isArray = val => Array.isArray(val);

/**
 * Cast `val` to an array.
 *
 * ```js
 * <%= arrayify('a') %>
 * //=> '["a"]'
 *
 * <%= arrayify({a: 'b'}) %>
 * //=> '[{a: "b"}]'
 *
 * <%= arrayify(['a']) %>
 * //=> '["a"]'
 * ```
 * @param  {*} `val` The value to arrayify.
 * @return  {Array} An array.
 * @return {Array}
 * @api public
 */

exports.arrayify = val => [].concat(val != null ? val : []);

/**
 * Returns the first item, or first `n` items of an array.
 *
 * ```js
 * <%= first(['a', 'b', 'c', 'd', 'e'], 2) %>
 * //=> '["a", "b"]'
 * ```
 * @name .first
 * @param {Array} `array`
 * @param {Number} `n` Number of items to return, starting at `0`.
 * @return {Array}
 * @api public
 */

exports.first = (arr, n) => {
  if (utils.isEmpty(arr)) return '';
  if (utils.isNumber(n)) {
    return arr.slice(0, n);
  }
  return arr[0];
};

/**
 * Returns the last item, or last `n` items of an array.
 *
 * ```js
 * <%= last(['a', 'b', 'c', 'd', 'e'], 2) %>
 * //=> '["d", "e"]'
 * ```
 * @param {Array} `array`
 * @param {Number} `n` Number of items to return, starting with the last item.
 * @return {Array}
 * @api public
 */

exports.last = (arr, n) => {
  if (utils.isEmpty(arr)) return '';
  if (!utils.isNumber(n)) {
    return arr[arr.length - 1];
  }
  return arr.slice(-n);
};

/**
 * Returns all of the items in an array up to the specified number
 * Opposite of `<%= after() %`.
 *
 * ```js
 * <%= before(['a', 'b', 'c'], 2) %>
 * //=> '["a", "b"]'
 * ```
 * @param {Array} `array`
 * @param {Number} `n`
 * @return {Array} Array excluding items after the given number.
 * @crosslink after
 * @api public
 */

exports.before = (arr, n) => {
  return !utils.isEmpty(arr) ? arr.slice(0, -n) : '';
};

/**
 * Returns all of the items in an arry after the specified index.
 * Opposite of `<%= before() %`.
 *
 * ```js
 * <%= after(['a', 'b', 'c'], 1) %>
 * //=> '["c"]'
 * ```
 * @param {Array} `array` Collection
 * @param {Number} `n` Starting index (number of items to exclude)
 * @return {Array} Array exluding `n` items.
 * @crosslink before
 * @api public
 */

exports.after = (arr, n) => {
  return !utils.isEmpty(arr) ? arr.slice(n) : '';
};

/**
 * Calling `fn` on each element of the given `array` with
 * the given `context`.
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
 * <%= each(['a', 'b', 'c'], double, ctx) %>
 * //=> '["aa", "bb", "cc"]'
 * ```
 * @param {Array} `array`
 * @param {String} `fn` The function to call on each element in the given array.
 * @return {String}
 * @api public
 */

exports.each = (arr, fn, context) => {
  if (utils.isEmpty(arr)) {
    return '';
  }

  let len = arr.length;
  let idx = -1;
  let res = '';
  let val;

  while (++idx < len) {
    if ((val = fn.call(context, arr[idx], idx, arr)) === false) {
      break;
    }
    res += val;
  }
  return res;
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
 * //=> '["aa", "bb", "cc"]'
 * ```
 * @param {Array} `array`
 * @param {String} `fn` The function to call on each element in the given array.
 * @return {String}
 * @api public
 */

exports.map = (arr, fn, context) => {
  if (utils.isEmpty(arr)) return '';

  let len = arr.length;
  let res = new Array(len);
  let idx = -1;

  while (++idx < len) {
    res[idx] = fn.call(context, arr[idx], idx, arr);
  }
  return res;
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
 * @param {Array} `array`
 * @param {String} `sep` The separator to use.
 * @return {String}
 * @api public
 */

exports.join = (arr, sep) => {
  if (utils.isEmpty(arr)) return '';
  return arr.join(typeof sep !== 'string' ? ', ' : sep);
};

/**
 * Sort the given `array`. If an array of objects is passed,
 * you may optionally pass a `key` to sort on as the second
 * argument. You may alternatively pass a sorting function as
 * the second argument.
 *
 * ```js
 * <%= sort(["b", "a", "c"]) %>
 * //=> 'a,b,c'
 *
 * <%= sort([{a: "zzz"}, {a: "aaa"}], "a") %>
 * //=> '[{"a":"aaa"},{"a":"zzz"}]'
 * ```
 * @param {Array} `array` the array to sort.
 * @param {String|Function} `key` The object key to sort by, or sorting function.
 * @api public
 */

exports.sort = (arr, key) => {
  if (utils.isEmpty(arr)) return '';
  if (typeof key === 'function') {
    return arr.sort(key);
  }
  if (typeof key !== 'string') {
    return arr.sort();
  }
  return arr.sort((a, b) => {
    if (object.isObject(a) && typeof a[key] === 'string') {
      return a[key].localeCompare(b[key]);
    }
    if (typeof a === 'string') {
      return a.localeCompare(b);
    }
    return a > b;
  });
};

/**
 * Returns the length of the given array.
 *
 * ```js
 * <%= length(['a', 'b', 'c']) %>
 * //=> 3
 * ```
 * @param  {Array} `array`
 * @return {Number} The length of the array.
 * @api public
 */

exports.length = arr => {
  if (utils.isEmpty(arr)) return '';
  return Array.isArray(arr) ? arr.length : 0;
};

/**
 * Returns an array with all falsey values removed.
 *
 * ```js
 * <%= compact([null, a, undefined, 0, false, b, c, '']) %>
 * //=> '["a", "b", "c"]'
 * ```
 * @param {Array} `arr`
 * @return {Array}
 * @api public
 */

exports.compact = arr => {
  return !utils.isEmpty(arr) ? arr.filter(Boolean) : '';
};

/**
 * Return the difference between the first array and
 * additional arrays.
 *
 * ```js
 * <%= difference(["a", "c"], ["a", "b"]) %>
 * //=> '["c"]'
 * ```
 * @param  {Array} `array` The array to compare againts.
 * @param  {Array} `arrays` One or more additional arrays.
 * @return {Array}
 * @api public
 */

exports.difference = (...args) => {
  if (utils.isEmpty(args)) return '';
  let [ a, b, c ] = args;
  let len = a.length;
  let arr = [];
  let rest;

  if (b == null) {
    return a;
  }

  if (c == null) {
    rest = b;
  } else {
    rest = utils.flatten(args.slice(1));
  }

  while (len--) {
    if (rest.indexOf(a[len]) === -1) {
      arr.unshift(a[len]);
    }
  }
  return arr;
};

/**
 * Return an array, free of duplicate values.
 *
 * ```js
 * <%= unique(['a', 'b', 'c', 'c']) %
 * => '["a", "b", "c"]'
 * ```
 * @param  {Array} `array` The array to uniquify
 * @return {Array} Duplicate-free array
 * @api public
 */

exports.unique = arr => {
  if (utils.isEmpty(arr)) return '';
  let len = arr.length;
  let i = -1;

  while (i++ < len) {
    let j = i + 1;

    for (; j < arr.length; ++j) {
      if (arr[i] === arr[j]) {
        arr.splice(j--, 1);
      }
    }
  }
  return arr;
};

/**
 * Returns an array of unique values using strict equality for comparisons.
 *
 * ```js
 * <%= union(["a"], ["b"], ["c"]) %>
 * //=> '["a", "b", "c"]'
 * ```
 * @param {Array} `arr`
 * @return {Array}
 * @api public
 */

exports.union = (...args) => {
  return !utils.isEmpty(args) ? utils.union([], [].concat.apply([], args)) : '';
};

/**
 * Shuffle the items in an array.
 *
 * ```js
 * <%= shuffle(["a", "b", "c"]) %>
 * //=> ["c", "a", "b"]
 * ```
 * @param  {Array} `arr`
 * @return {Array}
 * @api public
 */

exports.shuffle = arr => {
  let len = arr.length;
  let res = new Array(len);
  let i = -1;

  while (++i < len) {
    let rand = utils.random(0, i);
    if (i !== rand) {
      res[i] = res[rand];
    }
    res[rand] = arr[i];
  }
  return res;
};

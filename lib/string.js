'use strict';

var wrap = require('word-wrap');
var lang = require('./lang');

/**
 * Cast the given value to a string. If `null` or `undefined`,
 * an empty string is returned.
 *
 * ```js
 * <%= toString() %>
 * //=> '""'
 *
 * <%= toString(null) %>
 * //=> '""'
 * ```
 *
 * @param  {String} `string` The string to lowercase.
 * @return {String}
 * @api public
 */

exports.toString = function toString(val) {
  return val == null ? '' : val.toString();
};

/**
 * Lowercase the characters in the given `string`.
 *
 * ```js
 * <%= lowercase("ABC") %>
 * //=> 'abc'
 * ```
 *
 * @param  {String} `string` The string to lowercase.
 * @return {String}
 * @api public
 */

exports.lowercase = function lowercase(str) {
  if (str && typeof str === 'string') {
    return str.toLowerCase();
  }
  return '';
};

/**
 * Uppercase the characters in a string.
 *
 * ```js
 * <%= uppercase("abc") %>
 * //=> 'ABC'
 * ```
 *
 * @param  {String} `string` The string to uppercase.
 * @return {String}
 * @api public
 */

exports.uppercase = function uppercase(str) {
  if (str && typeof str === 'string') {
    return str.toUpperCase();
  }
  return '';
};

/**
 * Trim extraneous whitespace from the beginning and end
 * of a string.
 *
 * ```js
 * <%= trim("  ABC   ") %>
 * //=> 'ABC'
 * ```
 *
 * @param  {String} `string` The string to trim.
 * @return {String}
 * @api public
 */

exports.trim = function trim(str) {
  return str.trim();
};

/**
 * Chop both extraneous whitespace and non-word characters
 * from the beginning and end of a string.
 *
 * ```js
 * <%= chop("_ABC_") %>
 * //=> 'ABC'
 *
 * <%= chop("-ABC-") %>
 * //=> 'ABC'
 *
 * <%= chop(" ABC ") %>
 * //=> 'ABC'
 * ```
 *
 * @param  {String} `string` The string to chop.
 * @return {String}
 * @api public
 */

exports.chop = function chop(str) {
  return str.trim().replace(/^[_.-\W\s]|[_.-\W\s]$/g, '');
};

/**
 * camelCase the characters in `string`.
 *
 * ```js
 * <%= camelcase("foo bar baz") %>
 * //=> 'fooBarBaz'
 * ```
 *
 * @param  {String} `string` The string to camelcase.
 * @return {String}
 * @api public
 */

exports.camelcase = function camelcase(str) {
  if (!str || typeof str !== 'string') { return ''; }
  if (str.length === 1) {return str; }
  var re = /[_.-\W](\w|$)/g;
  return exports.chop(str).replace(re, function (_, ch) {
    return ch.toUpperCase();
  });
};

/**
 * PascalCase the characters in `string`.
 *
 * ```js
 * <%= pascalcase("foo bar baz") %>
 * //=> 'fooBarBaz'
 * ```
 *
 * @param  {String} `string`
 * @return {String}
 * @api public
 */

exports.pascalcase = function pascalcase(str) {
  if (!str || typeof str !== 'string') return '';

  str = exports.camelcase(str);
  return str[0].toUpperCase() + str.slice(1);
};

/**
 * snake_case the characters in `string`.
 *
 * ```js
 * <%= snakecase("abc") %>
 * //=> 'ABC'
 * ```
 *
 * @param  {String} `string`
 * @return {String}
 * @api public
 */

exports.snakecase = function snakecase(str) {
  if (!str || typeof str !== 'string') return '';

};

/**
 * Wrap words to a specified width using [word-wrap].
 *
 * ```js
 * <%= wordwrap("a b c d e f", {width: 5, newline: '<br>  '}) %>
 * //=> '  a b c <br>  d e f'
 * ```
 *
 * @param  {String} `string` The string with words to wrap.
 * @param  {Options} `object` Options to pass to [word-wrap]
 * @return {String} Formatted string.
 * @api public
 */

exports.wordwrap = function wordwrap(str, options) {
  return wrap.apply(wrap, arguments);
};

/**
 * Count the number of occurrances of a substring
 * within a string.
 *
 * ```js
 * <%= count("abcabcabc", "a") %>
 * //=> '3'
 * ```
 *
 * @param  {String} `string`
 * @param  {String} `substring`
 * @return {Number} The occurances of `substring` in `string`
 * @api public
 */

exports.count = function count(str, sub) {
  return sub ? (str.split(sub).length - 1) : 0;
};

exports.reverse = function reverse(str) {
  if (str && typeof str === 'string') {
    return str.split('').reverse().join('');
  }
  return '';
};

// -------------------------------------------------
// TODO
// -------------------------------------------------

/**
 * Center a string using non-breaking spaces
 * @param  {String} str
 * @param  {String} spaces
 * @return {String}
 * @api public
 */

exports.center = function center(str, spaces) {
  if (str && typeof str === 'string') {
    var space = '', i = -1;
    while (++i < spaces) {
      space += '&nbsp;';
    }
    return space + str + space;
  }
};


/**
 * Replace occurrences of string "A" with string "B"
 *
 * @param  {String} str
 * @param  {String} a
 * @param  {String} b
 * @return {String}
 * @api public
 */

exports.replace = function replace(str, a, b) {
  if (!str) return '';
  if (typeof str === "string") {
    return str.split(a).join(b);
  }
  if (str instanceof RegExp) {
    return str.replace(a, b);
  }
};

/**
 * Truncate the input string and removes all HTML tags
 *
 * @param  {String} str      The input string.
 * @param  {Number} limit    The number of characters to limit the string.
 * @param  {String} append   The string to append if charaters are omitted.
 * @return {String}          The truncated string.
 * @api public
 */

exports.ellipsis = function ellipsis(str, limit, append) {
  append = typeof append === 'string' ? append : '';

  var sanitized = str.replace(/(<([^>]+)>)/g, '');
  if (sanitized.length > limit) {
    return sanitized.substr(0, limit - append.length) + append;
  } else {
    return sanitized;
  }
};

/**
 * Truncates a string given a specified `length`, providing a
 * custom string to denote an `omission`.
 *
 * @param  {String} str
 * @param  {String} length
 * @param  {String} omission
 * @return {String}
 * @api public
 */

exports.truncate = function truncate(str, limit, omission) {
  omission = typeof omission === 'string' ? omission : '';

  if (str.length > limit) {
    return str.substring(0, limit - omission.length) + omission;
  } else {
    return str;
  }
};

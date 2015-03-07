'use strict';

/**
 * Capitalize the first word in a sentence.
 *
 * ```js
 * <%= capitalize("a boring sentence.") %>
 * //=> "A boring sentence."
 * ```
 *
 * @param  {String} `str`
 * @return {String}
 * @api public
 */

exports.capitalize = function capitalize(str) {
  if (str && typeof str === 'string') {
    return str.charAt(0).toUpperCase()
      + str.slice(1);
  }
};

/**
 * Capitalize the first word in a sentence
 * @param  {String} `str`
 * @return {String}
 * @api public
 */

exports.capitalizeFirst = function capitalizeFirst(str) {
  if (str && typeof str === 'string') {
    return str.replace(/\w\S*/, function (word) {
      return exports.capitalize(word);
    });
  }
};

/**
 * Capitalize each word in a sentence.
 *
 * @param  {String} `str`
 * @return {String}
 * @api public
 */

exports.capitalizeEach = function capitalizeEach(str) {
  if (str && typeof str === 'string') {
    return str.replace(/\w\S*/g, function (word) {
      return exports.capitalize(word);
    });
  }
};

/**
 * Capitalize each word in a sentence (DUPLICATE)
 *
 * @param  {String} `str`
 * @return {String}
 * @api public
 */

exports.capitalizeAll = function capitalizeAll(str) {
  if (str && typeof str === 'string') {
    var words = str.split(' ');
    var len = words.length;
    var res = [];
    var i = 0;

    while(len--) {
      var word = words[i++];
      res.push(exports.capitalize(word));
    }
    return res.join(' ');
  }
};

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
 * Replace periods in string with hyphens.
 * @param  {String} str
 * @return {String}
 * @api public
 */

exports.dashify = function dashify(str) {
  if (str && typeof str === 'string') {
    return str.split('.').join('-');
  }
};

/**
 * Replace spaces in string with hyphens.
 * @param  {String} str
 * @return {String}
 * @api public
 */

exports.hyphenate = function hyphenate(str) {
  if (str && typeof str === 'string') {
    return str.split(' ').join('-');
  }
};

/**
 * Make all letters in the string lowercase
 * @param  {String} str
 * @return {String}
 * @api public
 */

exports.lowercase = function lowercase(str) {
  if (str && typeof str === 'string') {
    return str.toLowerCase();
  }
};

/**
 * Replace spaces in string with pluses.
 * @source: Stephen Way <https://github.com/stephenway>
 * @param  {String} str The input string
 * @return {String}     Input string with spaces replaced by plus signs
 * @api public
 */

exports.plusify = function plusify(str) {
  if (str && typeof str === 'string') {
    return str.split(' ').join('+');
  }
};

/**
 * Sentence case
 * @param  {String} str
 * @return {String}
 * @api public
 */

exports.sentence = function sentence(str) {
  var re = /((?:\S[^\.\?\!]*)[\.\?\!]*)/g;

  if (str && typeof str === 'string') {
    return str.replace(re, function(txt) {
      return txt.charAt(0).toUpperCase()
        + txt.substr(1).toLowerCase();
    });
  }
};

/**
 * Title case. "This is Title Case"
 * @param  {String} str
 * @return {String}
 * @api public
 */

exports.titleize = function titleize(str) {
  if (str && typeof str === 'string') {
    var title = str.replace(/[ \-_]+/g, ' ');
    var words = title.match(/\w+/g);
    var len = words.length;
    var res = [];
    var i = 0;

    while (len--) {
      var word = words[i++];
      res.push(exports.capitalize(word));
    }

    return res.join(' ');
  }
};

exports.uppercase = function uppercase(str) {
  if (str && typeof str === 'string') {
    return str.toUpperCase();
  }
  return '';
};

exports.reverse = function reverse(str) {
  if (str && typeof str === 'string') {
    return str.split('').reverse().join('');
  }
  return '';
};

/**
 * Return the number of occurrances of a string, within a string
 *
 * @param  {String} str       The haystack
 * @param  {String} substring The needle
 * @return {Number}           The number of times the needle is found in the haystack.
 * @api public
 */

exports.count = function count(str, substring) {
  if (str && typeof str === "string") {
    var l = substring.length;
    var n = 0, pos = 0;

    while (true) {
      pos = str.indexOf(substring, pos);
      if (pos > -1) {
        n++;
        pos += l;
      } else {
        break;
      }
    }
    return n;
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
  if (str && typeof str === "string") {
    return str.split(a).join(b);
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

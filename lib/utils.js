'use strict';

const typeOf = require('kind-of');

exports.isEmpty = val => {
  if (typeof val === 'function') {
    return false;
  }
  if (exports.isObject(val)) {
    val = Object.keys(val);
  }
  if (Array.isArray(val)) {
    return val.length === 0;
  }
  if (typeof val === 'undefined') {
    return true;
  }
  if (val === 0) {
    return false;
  }
  if (val == null) {
    return true;
  }
};

exports.omit = (obj, keys = []) => {
  let res = {};

  for (let key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      res[key] = obj[key];
    }
  }

  return res;
};

/**
 * Get the "title" from a markdown link
 */

exports.getTitle = str => {
  if (/^\[[^\]]+\]\(/.test(str)) {
    let m = /^\[([^\]]+)\]/.exec(str);
    if (m) return m[1];
  }
  return str;
};

exports.isString = str => str !== '' && typeof str === 'string';

exports.isNumber = num => {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};

exports.isObject = val => typeOf(val) === 'object';

exports.isPlainObject = val => {
  return exports.isObject(val) && val.constructor === Object;
};

/**
 * Returns true if the given `val` is an object.
 *
 * ```js
 * utils.isObject('foo');
 * //=> false
 *
 * utils.isObject({});
 * //=> true
 * ```
 * @param {any} `val`
 * @return {Boolean}
 * @api public
 */

exports.isObject = val => {
  return typeOf(val) === 'object';
};

/**
 * Stringify HTML tag attributes from the given `object`.
 *
 * @param {Object} `object` Object of attributes as key-value pairs.
 * @return {String} Stringified attributes, e.g. `foo="bar"`
 * @api public
 */

exports.toAttributes = obj => {
  return Object.keys(obj).map(key => `${key}="${obj[key]}"`).join(' ');
};

exports.toCodeBlock = (str, lang) => {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string.');
  }
  let code = '';
  code += '```' + (typeof lang === 'string' ? lang : '');
  code += '\n';
  code += str;
  code += '\n';
  code += '```';
  return code;
};

/**
 * Generate a random number
 *
 * @param  {Number} `min`
 * @param  {Number} `max`
 * @return {Number}
 */

exports.random = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

exports.flatten = arr => {
  const flat = (a, res) => {
    let len = a.length;
    let i = -1;
    while (len--) {
      let cur = a[++i];
      if (Array.isArray(cur)) {
        flat(cur, res);
      } else {
        res.push(cur);
      }
    }
    return res;
  };
  return flat(arr, []);
};

exports.union = (...args) => {
  return [...new Set(exports.flatten(args))];
};

/**
 * Expose `exports` modules
 */

module.exports = exports;

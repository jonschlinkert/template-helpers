'use strict';

const hasOwn = Object.prototype.hasOwnProperty;
const get = require('get-value');
const utils = require('../utils');

/**
 * Specify a fallback value to use when the desired
 * value is undefined. Note that undefined variables
 * that are _not object properties_ with throw an error.
 *
 * ```js
 * // when `title` is undefined, use the generic `site.title`
 * <%= fallback(page.title, site.title) %>
 * ```
 * @param  {*} `a` The desired value.
 * @param  {*} `b` The fallback ("default") value
 * @return {*} Either `a` or `b`
 * @api public
 */

exports.fallback = (a, b) => a != null ? a : b;

/**
 * Stringify an object using `JSON.stringify()`.
 *
 * ```js
 * <%= stringify({a: "a"}) %>
 * //=> '{"a":"a"}'
 * ```
 * @param  {Object} `object`
 * @return {String}
 * @api public
 */

exports.stringify = obj => JSON.stringify(obj);

/**
 * Parse a string into an object using `JSON.parse()`.
 *
 * ```js
 * <%= parse('{"foo":"bar"}')["foo"] %>
 * //=> 'bar'
 * ```
 * @param  {String} `str` The string to parse.
 * @return {Object} The parsed object.
 * @api public
 */

exports.parse = str => utils.isString(str) ? JSON.parse(str) : void 0;

/**
 * Use property paths (`a.b.c`) get a nested value from an object.
 *
 * ```js
 * <%= get({a: {b: 'c'}}, 'a.b') %>
 * //=> 'c'
 * ```
 * @param  {Object} `object`
 * @param  {String} `path` Dot notation for the property to get.
 * @return {String}
 * @api public
 */

exports.get = (obj, prop, options) => get(obj, prop, options);

/**
 * Returns an array of keys from the given `object`.
 *
 * ```js
 * <%= keys({a: 'b', c: 'd'}) %>
 * //=> '["a", "c"]'
 * ```
 * @param  {Object} `object`
 * @return {Array} Keys from `object`
 * @api public
 */

exports.keys = obj => Object.keys(obj);

/**
 * Return true if the given `value` is an object, and
 * not `null` or an array.
 *
 * ```js
 * <%= isObject(['a', 'b', 'c']) %>
 * //=> 'false'
 *
 * <%= isObject({a: 'b'}) %>
 * //=> 'true'
 * ```
 * @param  {Object} `value` The value to check.
 * @return {Boolean}
 * @api public
 */

exports.isObject = utils.isObject;

/**
 * Return true if the given `value` is a plain object.
 *
 * ```js
 * <%= isPlainObject(['a', 'b', 'c']) %>
 * //=> 'false'
 *
 * <%= isPlainObject({a: 'b'}) %>
 * //=> 'true'
 *
 * <%= isPlainObject(/foo/g) %>
 * //=> 'false'
 * ```
 * @param  {Object} `value` The value to check.
 * @return {Boolean}
 * @api public
 */

exports.isPlainObject = val => utils.isPlainObject(val);

/**
 * Return true if `key` is an own, enumerable property
 * of the given `obj`.
 *
 * @param  {Object} `object`
 * @param  {String} `key`
 * @return {Boolean}
 * @api public
 */

exports.hasOwn = (obj, key) => hasOwn.call(obj, key);

/**
 * Return a copy of `object` exclusing the given `keys`.
 *
 * ```js
 * <%= omit({a: 'a', b: 'b', c: 'c'}, ['a', 'c']) %>
 * //=> '{b: "b"}'
 * ```
 * @param  {Object} `object` Object with keys to omit.
 * @param  {String} `keys` Keys to omit.
 * @return {Boolean}
 * @api public
 */

exports.omit = (obj, keys) => utils.omit(obj, keys);

/**
 * Iterate over the own and inherited enumerable properties of an object,
 * and return an object with properties that evaluate to true from the
 * callback. Exit early by returning `false`.
 *
 * ```js
 * const context = { values: { a: 'b', c: 'd' } };
 * const str = '<% forIn(values, function(val, key) { %><%= val %><% }) %>';
 * const fn = _.template(str, { imports: helpers });
 * assert.equal(fn(context), 'bd');
 * ```
 * @param  {Object} `object` Object with keys to omit.
 * @param  {String} `keys` Keys to omit.
 * @return {Boolean}
 * @api public
 */

exports.forIn = (obj, fn, context) => {
  for (let key in obj) {
    if (fn.call(context, obj[key], key, obj) === false) {
      break;
    }
  }
};

/**
 * Iterate over the own enumerable properties of an object,
 * and return an object with properties that evaluate to true
 * from the callback. Exit early by returning `false`
 *
 * ```js
 * const context = { values: { a: 'b', c: 'd' } };
 * const str = '<% forOwn(values, function(val, key) { %><%= key %><% }) %>';
 * const fn = _.template(str, { imports: helpers });
 * console.log(fn(context)) //=> 'ac'
 * ```
 * @param  {Object} `object` Object with keys to omit.
 * @param  {String} `keys` Keys to omit.
 * @return {Boolean}
 * @api public
 */

exports.forOwn = (obj, fn, context) => {
  exports.forIn(obj, (val, key) => {
    if (hasOwn.call(obj, key)) {
      return fn.call(context, obj[key], key, obj);
    }
  });
};

/**
 * Extend `o` with properties of other `objects`.
 *
 * @param  {Object} `o` The target object. Pass an empty object to shallow clone.
 * @param  {Object} `objects`
 * @return {Object}
 * @api public
 */

exports.extend = (obj, ...rest) => {
  if (!utils.isObject(obj)) return '';
  let last = rest[rest.length - 1];

  if (utils.isObject(last) && last.hash) {
    rest.pop();
  }

  let len = rest.length;
  if (len === 0) {
    return obj;
  }

  for (let ele of rest) {
    if (utils.isObject(ele)) {
      for (let key in ele) {
        if (exports.hasOwn(ele, key)) {
          obj[key] = ele[key];
        }
      }
    }
  }

  return obj;
};

/**
 * Recursively combine the properties of `o` with the
 * properties of other `objects`.
 *
 * @param  {Object} `o` The target object. Pass an empty object to shallow clone.
 * @param  {Object} `objects`
 * @return {Object}
 * @api public
 */

exports.merge = (obj, ...rest) => {
  if (!utils.isObject(obj)) return '';
  let last = rest[rest.length - 1];

  if (utils.isObject(last) && last.hash) {
    rest.pop();
  }

  let len = rest.length;
  if (len === 0) {
    return obj;
  }

  for (let ele of rest) {
    if (utils.isObject(ele)) {
      for (let key in ele) {
        if (exports.hasOwn(ele, key)) {
          if (utils.isObject(ele[key])) {
            obj[key] = exports.merge(obj[key], ele[key]);
          } else {
            obj[key] = ele[key];
          }
        }
      }
    }
  }

  return obj;
};

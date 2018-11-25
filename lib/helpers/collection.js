'use strict';

const any = require('any');
const iterator = require('../iterator');
const utils = require('../utils');

/**
 * Returns `true` if `value` exists in the given string, array
 * or object. See [any] for documentation.
 *
 * @param {*} `value`
 * @param {*} `target`
 * @param {Object} `options`
 * @api public
 */

exports.any = any;

/**
 * Filter the given array or object to contain only the matching values.
 *
 * ```js
 * <%= filter(['foo', 'bar', 'baz']) %>
 * //=> '["a", "b", "c"]'
 * ```
 *
 * @param {Array} `arr`
 * @return {Array}
 * @api public
 */

exports.filter = (val, fn, context) => {
  if (utils.isEmpty(val)) return '';
  let iter = () => {};

  if (typeof fn === 'string') {
    let prop = fn;
    iter = target => {
      return typeof target === 'string' ? target === prop : target[prop];
    };
  } else {
    iter = iterator(fn, context);
  }

  if (typeof val === 'string') {
    return iter(val);
  }

  if (Array.isArray(val)) {
    return val.filter(iter);
  }

  if (utils.isObject(val)) {
    let obj = val;
    let res = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && iter(key)) {
        res[key] = obj[key];
      }
    }
    return res;
  }
};

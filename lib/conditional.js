'use strict';

/**
 * Return true if `key` is an own, enumerable property
 * of the given `obj`.
 *
 * @param  {Object} `object`
 * @param  {String} `key`
 * @return {Boolean}
 * @api public
 */

exports._if = function _if(fn, a, b, thisArg) {
  if (typeof fn !== 'function') return '';
  var res = fn.call(thisArg || this, a, b);
  if (res) {
    return a;
  }
  return b;
};

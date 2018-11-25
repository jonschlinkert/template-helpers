'use strict';

/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */

const helpers = require('./lib/helpers');

module.exports = key => {
  let res = {};

  if (typeof key === 'string') {
    res = helpers[key];
    res[key] = res;
    return res;
  }

  if (Array.isArray(key)) {
    return key.reduce((acc, k) => {
      acc[k] = helpers[k];
      for (let prop of Object.keys(acc[k])) {
        acc[prop] = acc[k][prop];
      }
      return acc;
    }, {});
  }

  for (let prop of Object.keys(helpers)) {
    let group = helpers[prop];
    res[prop] = group;

    for (let k of Object.keys(group)) {
      res[k] = group[k];
    }
  }
  return res;
};

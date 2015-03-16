/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var helpers = require('./lib');

module.exports = Object.keys(helpers).reduce(function (acc, key) {
  acc[key] = helpers[key];
  acc._ = acc._ || {};

  helpers.object.extend(acc._, helpers[key]);
  return acc;
}, {});

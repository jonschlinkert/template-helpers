/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var define = require('define-property');
var forIn = require('for-in');

/**
 * Expose helpers
 */

module.exports = function(key) {
  var lib = require('./lib');
  var helpers = {};

  if (typeof key === 'string') {
    return lib[key];
  }

  if (Array.isArray(key)) {
    return key.reduce(function(acc, k) {
      acc[k] = lib[k];

      forIn(acc[k], function(group, key) {
        acc[key] = group;
      });

      return acc;
    }, {});
  }

  forIn(lib, function(group, key) {
    helpers[key] = group;

    forIn(group, function(v, k) {
      helpers[k] = v;
    });
  });

  return helpers;
};


/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var assert = require('assert');
var lib = require('..');
var helpers;

describe('helpers', function() {
  before(function() {
    helpers = lib();
  });

  it('should expose all helpers on main export', function() {
    var keys = Object.keys(helpers);
    assert(keys.length > 70);
  });

  it('should expose array helpers on `array`', function() {
    assert(helpers.array);
    assert(typeof helpers.array === 'object');
  });

  it('should expose code helpers on `code`', function() {
    assert(helpers.code);
    assert(typeof helpers.code === 'object');
  });

  it('should expose collection helpers on `collection`', function() {
    assert(helpers.collection);
    assert(typeof helpers.collection === 'object');
  });

  it('should expose conditional helpers on `conditional`', function() {
    assert(helpers.conditional);
    assert(typeof helpers.conditional === 'object');
  });

  it('should expose fs helpers on `fs`', function() {
    assert(helpers.fs);
    assert(typeof helpers.fs === 'object');
  });

  it('should expose html helpers on `html`', function() {
    assert(helpers.html);
    assert(typeof helpers.html === 'object');
  });

  it('should expose math helpers on `math`', function() {
    assert(helpers.math);
    assert(typeof helpers.math === 'object');
  });

  it('should expose object helpers on `object`', function() {
    assert(helpers.object);
    assert(typeof helpers.object === 'object');
  });

  it('should expose string helpers on `string`', function() {
    assert(helpers.string);
    assert(typeof helpers.string === 'object');
  });
});

/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

const assert = require('assert');
const lib = require('..');
let helpers;

describe('helpers', function() {
  before(function() {
    helpers = lib();
  });

  it('should expose all helpers on main export', function() {
    let keys = Object.keys(helpers);
    assert(keys.length > 70);
  });

  it('should expose array helpers on `array`', function() {
    assert(helpers.array);
    assert(typeof helpers.array === 'object');
  });

  it('should filter out array helpers when passed as an argument to lib', function() {
    let array = lib('array');
    assert(typeof array === 'object');
  });

  it('should expose code helpers on `code`', function() {
    assert(helpers.code);
    assert(typeof helpers.code === 'object');
  });

  it('should filter out code helpers when passed as an argument to lib', function() {
    let code = lib('code');
    assert(typeof code === 'object');
  });

  it('should expose collection helpers on `collection`', function() {
    assert(helpers.collection);
    assert(typeof helpers.collection === 'object');
  });

  it('should filter out collection helpers when passed as an argument to lib', function() {
    let collection = lib('collection');
    assert(typeof collection === 'object');
  });

  it('should expose conditional helpers on `conditional`', function() {
    assert(helpers.conditional);
    assert(typeof helpers.conditional === 'object');
  });

  it('should filter out conditional helpers when passed as an argument to lib', function() {
    let conditional = lib('conditional');
    assert(typeof conditional === 'object');
  });

  it('should expose fs helpers on `fs`', function() {
    assert(helpers.fs);
    assert(typeof helpers.fs === 'object');
  });

  it('should filter out fs helpers when passed as an argument to lib', function() {
    let fs = lib('fs');
    assert(typeof fs === 'object');
  });

  it('should expose html helpers on `html`', function() {
    assert(helpers.html);
    assert(typeof helpers.html === 'object');
  });

  it('should filter out html helpers when passed as an argument to lib', function() {
    let html = lib('html');
    assert(typeof html === 'object');
  });

  it('should expose math helpers on `math`', function() {
    assert(helpers.math);
    assert(typeof helpers.math === 'object');
  });

  it('should filter out math helpers when passed as an argument to lib', function() {
    let math = lib('math');
    assert(typeof math === 'object');
  });

  it('should expose object helpers on `object`', function() {
    assert(helpers.object);
    assert(typeof helpers.object === 'object');
  });

  it('should filter out object helpers when passed as an argument to lib', function() {
    let object = lib('object');
    assert(typeof object === 'object');
  });

  it('should expose path helpers on `path`', function() {
    assert(helpers.path);
    assert(typeof helpers.path === 'object');
  });

  it('should filter out path helpers when passed as an argument to lib', function() {
    let path = lib('path');
    assert(typeof path === 'object');
  });

  it('should expose string helpers on `string`', function() {
    assert(helpers.string);
    assert(typeof helpers.string === 'object');
  });

  it('should filter out string helpers when passed as an argument to lib', function() {
    let string = lib('string');
    assert(typeof string === 'object');
    assert(typeof string.lower === 'function');
    assert(typeof string.upper === 'function');
  });

  it('should filter out an array of groups', function() {
    let helpers = lib(['string', 'array']);
    assert(typeof helpers === 'object');
    assert(typeof helpers.last === 'function');
    assert(typeof helpers.upper === 'function');
  });
});

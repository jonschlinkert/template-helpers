/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var assert = require('assert');
var helpers = require('..')(['collection', 'object']);
var template = require('lodash.template');

var imports = {imports: helpers};

describe('collections', function() {
  describe('any', function() {
    it('should be false undefined.', function() {
      assert.equal(template('<%= any() %>', imports)(), 'false');
    });
    it('should return if a value exists in the given string.', function() {
      assert.equal(template('<%= any("a-b-c", "a") %>', imports)(context), 'true');
      assert.equal(template('<%= any("a-b-c", "d") %>', imports)(context), 'false');
    });
    it('should return if a value exists in the given object.', function() {
      assert.equal(template('<%= any({a: "b", c: "d"}, "a") %>', imports)(context), 'true');
      assert.equal(template('<%= any([{a: "b", c: "d"}], {a: "b"}) %>', imports)(context), 'true');
    });
    it('should return if a value exists in the given array.', function() {
      assert.equal(template('<%= any("a-b-c", "d") %>', imports)(context), 'false');
    });
  });

  describe('filter', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= filter() %>', imports)(), '');
    });
    it('should return a string value if it exists in the given array', function() {
      assert.equal(template('<%= filter(["a", "b", "c"], "a") %>', imports)(context), 'a');
    });
    it('should return an empty string if a string value does not exists', function() {
      assert.equal(template('<%= filter(["a", "b", "c"], "d") %>', imports)(context), '');
    });
    it('should filter out values that match the given regex', function() {
      assert.equal(template('<%= filter(["a", "b", "c", "d", "z"], /[a-c]/) %>', imports)(context), 'a,b,c');
    });
    it('should filter out values using a function', function() {
      assert.equal(template('<%= filter(["a", "b", "c", "d", "z"], function(key) { return /(a|z)/.test(key) }) %>', imports)(context), 'a,z');
    });
    it('should return true if the value equals given string', function() {
      assert.equal(template('<%= filter("a", "a") %>', imports)(context), 'true');
    });
    it('should return false if the value does not equal the given string', function() {
      assert.equal(template('<%= filter("a-b-c", "d") %>', imports)(context), 'false');
    });
    it('should filter out properties that match the given value', function() {
      assert.equal(template('<%= stringify(filter({a: "b", c: "d"}, "a")) %>', imports)(context), '{"a":"b"}');
    });
    it('should filter out objects that match the given value', function() {
      assert.equal(template('<%= stringify(filter([{a: "b", c: "d"}], {a: "b"})) %>', imports)(context), '[{"a":"b","c":"d"}]');
    });
  });
});

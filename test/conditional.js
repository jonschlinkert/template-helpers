/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var assert = require('assert');
var helpers = require('..')('conditional');
var template = require('lodash.template');

var imports = {imports: helpers};
var context = {
  fn: function(a, b) {
    return this && this.foo === 'abc';
  },
  thisArg: {foo: 'abc', bar: 'xyz'}
};

describe('conditional', function() {
  describe('if', function() {
    it('should return an empty string when the first arg is not a function.', function() {
      assert.equal(template('<%= _if("foo", "bar", thisArg) %>', imports)(context), '');
    });
    it('should return the first value when `fn` returns true.', function() {
      assert.equal(template('<%= _if(fn, "foo", "bar", thisArg) %>', imports)(context), 'foo');
    });
    it('should return the second value when `fn` returns false.', function() {
      assert.equal(template('<%= _if(fn, "foo", "bar") %>', imports)(context), 'bar');
    });
  });

  describe('compare', function() {
    it('should be true when values are equal', function() {
      assert.equal(template('<%= compare("foo", "===", "foo") %>', imports)(context), 'true');
      assert.equal(template('<%= compare("foo", "==", "foo") %>', imports)(context), 'true');
    });

    it('should be false when values are not equal', function() {
      assert.equal(template('<%= compare("foo", "===", "bar") %>', imports)(context), 'false');
      assert.equal(template('<%= compare("foo", "==", "bar") %>', imports)(context), 'false');
    });
  });

  describe('is / eq', function() {
    it('should be true when values are equal', function() {
      assert.equal(template('<%= is("foo", "foo") %>', imports)(context), 'true');
      assert.equal(template('<%= eq("foo", "foo") %>', imports)(context), 'true');
    });

    it('should be false when values are not equal', function() {
      assert.equal(template('<%= is("foo", "bar") %>', imports)(context), 'false');
      assert.equal(template('<%= eq("foo", "bar") %>', imports)(context), 'false');
    });
  });

  describe('isnt / notEq', function() {
    it('should be false when values are equal', function() {
      assert.equal(template('<%= isnt("foo", "foo") %>', imports)(context), 'false');
      assert.equal(template('<%= notEq("foo", "foo") %>', imports)(context), 'false');
    });

    it('should be true when values are not equal', function() {
      assert.equal(template('<%= isnt("foo", "bar") %>', imports)(context), 'true');
      assert.equal(template('<%= notEq("foo", "bar") %>', imports)(context), 'true');
    });
  });
});

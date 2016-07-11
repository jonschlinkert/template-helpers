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
});

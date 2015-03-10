/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var helpers = require('..');
var _ = require('lodash');

var imports = {imports: helpers.conditional};
var context = {
  fn: function (a, b) {
    return this && this.foo === 'abc' ? true : false;
  },
  thisArg: {foo: 'abc', bar: 'xyz'}
};

describe('conditional', function() {
  describe('if', function() {

    it('should return the first value when `fn` returns true.', function() {
      _.template('<%= _if(fn, "foo", "bar", thisArg) %>', imports)(context).should.equal('foo');
    });
    it('should return the second value when `fn` returns false.', function() {
      _.template('<%= _if(fn, "foo", "bar") %>', imports)(context).should.equal('bar');
    });
  });
});

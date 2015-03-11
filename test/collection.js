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

var imports = {imports: helpers.collection};

describe('collections', function() {
  describe('any', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= any() %>', imports)().should.equal('false');
    });
    it('should return if a value exists in the given string.', function() {
      _.template('<%= any("a-b-c", "a") %>', imports)(context).should.equal('true');
      _.template('<%= any("a-b-c", "d") %>', imports)(context).should.equal('false');
    });
    it('should return if a value exists in the given object.', function() {
      _.template('<%= any({a: "b", c: "d"}, "a") %>', imports)(context).should.equal('true');
      _.template('<%= any([{a: "b", c: "d"}], {a: "b"}) %>', imports)(context).should.equal('true');
    });
    it('should return if a value exists in the given array.', function() {
      _.template('<%= any("a-b-c", "d") %>', imports)(context).should.equal('false');
    });
  });
});

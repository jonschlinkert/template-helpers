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

var imports = {imports: helpers.html};

describe('html', function() {
  describe('escapeHtml', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= escapeHtml() %>', imports)().should.equal('');
    });

    it('should return create a code example from the given file.', function() {
      _.template('<%= escapeHtml("<span>foo</span>") %>', imports)().should.equal('&lt;span&gt;foo&lt;&#x2F;span&gt;');
    });
  });

  describe('sanitize', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= sanitize() %>', imports)().should.equal('');
    });
    it('should strip html from a string.', function() {
      var actual = _.template('<%= sanitize("<span>foo</span>") %>', imports)()
      actual.should.equal('foo');
    });
  });
});

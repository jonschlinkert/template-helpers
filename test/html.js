/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var assert = require('assert');
var helpers = require('..')('html');
var template = require('lodash.template');

var imports = {imports: helpers};

describe('html', function() {
  describe('escapeHtml', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= escapeHtml() %>', imports)(), '');
    });

    it('should return create a code example from the given file.', function() {
      assert.equal(template('<%= escapeHtml("<span>foo</span>") %>', imports)(), '&lt;span&gt;foo&lt;&#x2F;span&gt;');
    });
  });

  describe('sanitize', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= sanitize() %>', imports)(), '');
    });
    it('should strip html from a string.', function() {
      var actual = template('<%= sanitize("<span>foo</span>") %>', imports)();
      assert.equal(actual, 'foo');
    });
  });
});

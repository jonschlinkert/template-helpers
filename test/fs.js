/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var assert = require('assert');
var helpers = require('..')('fs');
var template = require('lodash.template');

var imports = { imports: helpers };

describe('fs', function() {
  describe('exists', function() {
    it('should return false when the file does not exist.', function() {
      assert.equal(template('<%= exists("fooosos.js") %>', imports)(), 'false');
    });
  });

  describe('read', function() {
    it('should return an empty string when the file does not exist.', function() {
      assert.equal(template('<%= read("fooosos.js") %>', imports)(), '');
    });

    it('should read a file and inject its content.', function() {
      assert.equal(template('<%= read("test/fixtures/a.js") %>', imports)(), [
        'function foo(a, b, c) {',
        '  return a + b + c;',
        '}'
      ].join('\n'));
    });
  });
});

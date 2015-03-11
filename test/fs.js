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

var imports = {imports: helpers.fs};

describe('code', function() {
  var orig = process.cwd();
  before(function () {
    process.chdir(__dirname + '/fixtures');
  });
  after(function () {
    process.chdir(orig);
  });

  describe('fs', function() {
    it('should return an empty string when the file does not exist.', function() {
      _.template('<%= read("fooosos.js") %>', imports)().should.equal('');
    });

    it('should read a file and inject its content.', function() {
      _.template('<%= read("a.js") %>', imports)().should.equal([
        'function foo(a, b, c) {',
        '  return a + b + c;',
        '}'
      ].join('\n'));
    });

    it('should read a glob of files and concatenate them.', function() {
      _.template('<%= concat("*.js") %>', imports)().should.equal([
        'function foo(a, b, c) {',
        '  return a + b + c;',
        '}',
        'function bar(x, y, z) {',
        '  return x + y + z;',
        '}'
      ].join('\n'));
    });
  });
});

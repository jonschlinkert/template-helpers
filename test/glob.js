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

var imports = {imports: helpers._};
helpers.object.extend(imports.imports, {array: helpers.array});

describe('code', function() {
  var orig = process.cwd();
  before(function () {
    process.chdir(__dirname + '/fixtures');
  });
  after(function () {
    process.chdir(orig);
  });

  describe('glob', function() {
    it('should return a glob of files.', function() {
      _.template('<%= glob("*.js") %>', imports)().should.equal('a.js,b.js');
      _.template('<%= stringify(glob("*.js")) %>', imports)().should.equal('["a.js","b.js"]');
    });

    it('should read a glob of files.', function() {
      _.template('<%= map(glob("*.js"), read) %>', imports)().should.equal([
        'function foo(a, b, c) {',
        '  return a + b + c;',
        '},function bar(x, y, z) {',
        '  return x + y + z;',
        '}'
      ].join('\n'));
    });

    it('should read a glob of files and concatenate them.', function() {
      _.template('<%= array.join(map(glob("*.js"), read), "\\n\\n") %>', imports)().should.equal([
        'function foo(a, b, c) {',
        '  return a + b + c;',
        '}',
        '',
        'function bar(x, y, z) {',
        '  return x + y + z;',
        '}'
      ].join('\n'));
    });
  });
});

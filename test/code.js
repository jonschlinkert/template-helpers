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

var imports = {imports: helpers.code};
console.log(imports)

describe('code', function() {
  var orig = process.cwd();
  before(function () {
    process.chdir(__dirname + '/fixtures');
  });
  after(function () {
    process.chdir(orig);
  });

  describe('embed', function() {
    it('should return create a code example from the given file.', function() {
      _.template('<%= embed("a.js") %>', imports)().should.equal([
        '```js',
        'function foo(a, b, c) {',
        '  return a + b + c;',
        '}',
        '```\n'
      ].join('\n'));
    });

    it('should use the extension specified as a second argument.', function() {
      _.template('<%= embed("a.js", "javascript") %>', imports)().should.equal([
        '```javascript',
        'function foo(a, b, c) {',
        '  return a + b + c;',
        '}',
        '```\n'
      ].join('\n'));
    });

    it('should return create a jsfiddle link.', function() {
      _.template('<%= jsfiddle({id: "0dfk10ks", {tabs: true}}) %>', imports)().should.equal([
        '```js',
        'function foo(a, b, c) {',
        '  return a + b + c;',
        '}',
        '```\n'
      ].join('\n'));
    });
  });
});

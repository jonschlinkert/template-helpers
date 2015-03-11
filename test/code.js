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

describe('code', function() {
  var orig = process.cwd();
  before(function () {
    process.chdir(__dirname + '/fixtures');
  });
  after(function () {
    process.chdir(orig);
  });

  describe('jsfiddle', function() {
    it('should return an empty string with no args.', function() {
      _.template('<%= jsfiddle() %>', imports)()
      .should.equal('');
    });

    it('should return create a jsfiddle link.', function() {
      _.template('<%= jsfiddle({id: "c0th6weq", tabs: true}) %>', imports)()
      .should.equal('<iframe width="100%" height="300" src="http://jsfiddle.net/c0th6weq/embedded/true/presentation/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>');
    });
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

    it('should escape backticks in markdown.', function() {
      _.template('<%= embed("a.md", "md") %>', imports)().should.equal([
        '```md',
        '&#x60&#x60&#x60',
        'foo',
        '&#x60&#x60&#x60',
        '```\n'
      ].join('\n'));
    });
  });
});

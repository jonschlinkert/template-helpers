/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var helpers = require('..')('code');
var assert = require('assert');
var template = require('lodash.template');
var imports = {imports: helpers};

describe('code', function() {
  var orig = process.cwd();
  before(function() {
    process.chdir(__dirname + '/fixtures');
  });
  after(function() {
    process.chdir(orig);
  });

  describe('jsfiddle', function() {
    it('should return an empty string with no args.', function() {
      assert.equal(template('<%= jsfiddle() %>', imports)(), '');
    });

    it('should return create a jsfiddle link.', function() {
      assert.equal(template('<%= jsfiddle({id: "c0th6weq", tabs: true}) %>', imports)(), '<iframe width="100%" height="300" src="http://jsfiddle.net/c0th6weq/embedded/true/presentation/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>');
    });
  });
  describe('embed', function() {
    it('should return create a code example from the given file.', function() {
      assert.equal(template('<%= embed("a.js") %>', imports)({}), [
        '```js',
        'function foo(a, b, c) {',
        '  return a + b + c;',
        '}',
        '```\n'
      ].join('\n'));
    });

    it('should use the extension specified as a second argument.', function() {
      assert.equal(template('<%= embed("a.js", "javascript") %>', imports)(), [
        '```javascript',
        'function foo(a, b, c) {',
        '  return a + b + c;',
        '}',
        '```\n'
      ].join('\n'));
    });

    it('should escape backticks in markdown.', function() {
      assert.equal(template('<%= embed("a.md", "md") %>', imports)(), [
        '```md',
        '&#x60&#x60&#x60',
        'foo',
        '&#x60&#x60&#x60',
        '```\n'
      ].join('\n'));
    });
  });
});

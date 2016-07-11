/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var assert = require('assert');
var template = require('lodash.template');
var helpers = require('..')(['string', 'html']);

var imports = {imports: helpers};

describe('string helpers', function() {
  describe('lowercase', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= lowercase() %>', imports)(), '');
    });
    it('should lower case the characters in a string.', function() {
      var fn = template('<%= lowercase("ABC") %>', imports);
      assert.equal(fn(), 'abc');
    });
  });

  describe('uppercase', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= uppercase() %>', imports)(), '');
    });
    it('should upper case the characters in a string.', function() {
      var fn = template('<%= uppercase("abc") %>', imports);
      assert.equal(fn(), 'ABC');
    });
  });

  describe('trim', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= trim() %>', imports)(), '');
    });
    it('should strip leading whitespace from a string.', function() {
      var fn = template('<%= trim("    abc") %>', imports);
      assert.equal(fn(), 'abc');
    });
    it('should strip trailing whitespace from a string.', function() {
      var fn = template('<%= trim("abc   ") %>', imports);
      assert.equal(fn(), 'abc');
    });
  });

  describe('chop', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= chop() %>', imports)(), '');
    });
    it('should strip leading whitespace from a string.', function() {
      var fn = template('<%= chop("    abc") %>', imports);
      assert.equal(fn(), 'abc');
    });
    it('should strip trailing whitespace from a string.', function() {
      var fn = template('<%= chop("abc   ") %>', imports);
      assert.equal(fn(), 'abc');
    });
    it('should strip leading non-word characters from a string.', function() {
      var fn = template('<%= chop("_-abc") %>', imports);
      assert.equal(fn(), 'abc');
    });
    it('should strip trailing non-word characters from a string.', function() {
      var fn = template('<%= chop("abc_-") %>', imports);
      assert.equal(fn(), 'abc');
    });
  });

  describe('strip', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= strip() %>', imports)(), '');
    });
    it('should strip the given substring from a string.', function() {
      var fn = template('<%= strip("foo", "foobar") %>', imports);
      assert.equal(fn(), 'bar');
    });
    it('should strip the given regex match from a string.', function() {
      var fn = template('<%= strip(/^foo/, "foobarfoo") %>', imports);
      assert.equal(fn(), 'barfoo');
    });
  });

  describe('stripIndent', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= stripIndent() %>', imports)(), '');
    });
    it('should strip indentation from a string.', function() {
      var str = template('<%= stripIndent(str) %>', imports)({str: [
        '       - a',
        '       - b',
        '         * c',
        '         * d',
        '           + e',
        '           + f'
      ].join('\n')});
      assert.equal(str, [
        '- a',
        '- b',
        '  * c',
        '  * d',
        '    + e',
        '    + f'
      ].join('\n'));
    });
  });

  describe('camelcase', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= camelcase() %>', imports)(), '');
    });
    it('should camel-case the characters in a string.', function() {
      assert.equal(template('<%= camelcase("foo bar baz") %>', imports)(), 'fooBarBaz');
    });
    it('should camel-case the characters in a string.', function() {
      assert.equal(template('<%= camelcase("A") %>', imports)(), 'a');
    });
    it('should work with hyphens.', function() {
      assert.equal(template('<%= camelcase("foo-bar-baz") %>', imports)(), 'fooBarBaz');
      assert.equal(template('<%= camelcase("-foo bar baz-") %>', imports)(), 'fooBarBaz');
    });

    it('should work with other non-word characters.', function() {
      assert.equal(template('<%= camelcase("9foo-bar_baz") %>', imports)(), '9fooBarBaz');
      assert.equal(template('<%= camelcase("_foo_bar_baz-") %>', imports)(), 'fooBarBaz');
    });
  });

  describe('pascalcase', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= pascalcase() %>', imports)(), '');
    });
    it('should camel-case the characters in a string.', function() {
      assert.equal(template('<%= pascalcase("a") %>', imports)(), 'A');
      assert.equal(template('<%= pascalcase("A") %>', imports)(), 'A');
    });
    it('should pascal-case the characters in a string.', function() {
      assert.equal(template('<%= pascalcase("foo bar baz") %>', imports)(), 'FooBarBaz');
    });
    it('should work with hyphens.', function() {
      assert.equal(template('<%= pascalcase("foo-bar-baz") %>', imports)(), 'FooBarBaz');
      assert.equal(template('<%= pascalcase("-foo bar baz-") %>', imports)(), 'FooBarBaz');
    });

    it('should work with other non-word characters.', function() {
      assert.equal(template('<%= pascalcase("9foo-bar_baz") %>', imports)(), '9fooBarBaz');
      assert.equal(template('<%= pascalcase("_foo_bar_baz-") %>', imports)(), 'FooBarBaz');
    });
  });

  describe('snakecase', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= snakecase() %>', imports)(), '');
    });
    it('should camel-case the characters in a string.', function() {
      assert.equal(template('<%= snakecase("A") %>', imports)(), 'a');
    });
    it('should snake-case the characters in a string.', function() {
      assert.equal(template('<%= snakecase("foo bar baz") %>', imports)(), 'foo_bar_baz');
    });
    it('should work with hyphens.', function() {
      assert.equal(template('<%= snakecase("foo-bar-baz") %>', imports)(), 'foo_bar_baz');
      assert.equal(template('<%= snakecase("-foo bar baz-") %>', imports)(), 'foo_bar_baz');
    });

    it('should work with other non-word characters.', function() {
      assert.equal(template('<%= snakecase("9foo-bar_baz") %>', imports)(), '9foo_bar_baz');
      assert.equal(template('<%= snakecase("_foo_bar_baz-") %>', imports)(), 'foo_bar_baz');
    });
  });

  describe('dotcase', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= dotcase() %>', imports)(), '');
    });
    it('should camel-case the characters in a string.', function() {
      assert.equal(template('<%= dotcase("A") %>', imports)(), 'a');
    });
    it('should dot-case the characters in a string.', function() {
      assert.equal(template('<%= dotcase("foo bar baz") %>', imports)(), 'foo.bar.baz');
    });
    it('should work with hyphens.', function() {
      assert.equal(template('<%= dotcase("foo-bar-baz") %>', imports)(), 'foo.bar.baz');
      assert.equal(template('<%= dotcase("-foo bar baz-") %>', imports)(), 'foo.bar.baz');
    });

    it('should work with other non-word characters.', function() {
      assert.equal(template('<%= dotcase("9foo-bar_baz") %>', imports)(), '9foo.bar.baz');
      assert.equal(template('<%= dotcase("_foo_bar_baz-") %>', imports)(), 'foo.bar.baz');
    });
  });

  describe('dashcase', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= dashcase() %>', imports)(), '');
    });
    it('should camel-case the characters in a string.', function() {
      assert.equal(template('<%= dashcase("A") %>', imports)(), 'a');
    });
    it('should dash-case the characters in a string.', function() {
      assert.equal(template('<%= dashcase("foo bar baz") %>', imports)(), 'foo-bar-baz');
    });
    it('should work with hyphens.', function() {
      assert.equal(template('<%= dashcase("foo-bar-baz") %>', imports)(), 'foo-bar-baz');
      assert.equal(template('<%= dashcase("-foo bar baz-") %>', imports)(), 'foo-bar-baz');
    });

    it('should work with other non-word characters.', function() {
      assert.equal(template('<%= dashcase("9foo-bar_baz") %>', imports)(), '9foo-bar-baz');
      assert.equal(template('<%= dashcase("_foo_bar_baz-") %>', imports)(), 'foo-bar-baz');
    });
  });

  describe('pathcase', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= pathcase() %>', imports)(), '');
    });
    it('should camel-case the characters in a string.', function() {
      assert.equal(template('<%= pathcase("A") %>', imports)(), 'a');
    });
    it('should path-case the characters in a string.', function() {
      assert.equal(template('<%= pathcase("foo bar baz") %>', imports)(), 'foo/bar/baz');
    });
    it('should work with hyphens.', function() {
      assert.equal(template('<%= pathcase("foo-bar-baz") %>', imports)(), 'foo/bar/baz');
      assert.equal(template('<%= pathcase("-foo bar baz-") %>', imports)(), 'foo/bar/baz');
    });

    it('should work with other non-word characters.', function() {
      assert.equal(template('<%= pathcase("9foo-bar_baz") %>', imports)(), '9foo/bar/baz');
      assert.equal(template('<%= pathcase("_foo_bar_baz-") %>', imports)(), 'foo/bar/baz');
    });
  });

  describe('sentencecase', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= sentencecase() %>', imports)(), '');
    });
    it('should camel-case the characters in a string.', function() {
      assert.equal(template('<%= sentencecase("A") %>', imports)(), 'A');
      assert.equal(template('<%= sentencecase("a") %>', imports)(), 'A');
    });
    it('should sentence-case the characters in a string.', function() {
      assert.equal(template('<%= sentencecase("foo bar baz.") %>', imports)(), 'Foo bar baz.');
      assert.equal(template('<%= sentencecase("a") %>', imports)(), 'A');
    });
  });

  describe('hyphenate', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= hyphenate() %>', imports)(), '');
    });
    it('should hyphenate the characters in a string.', function() {
      assert.equal(template('<%= hyphenate("foo bar baz") %>', imports)(), 'foo-bar-baz');
    });
    it('should work with hyphens.', function() {
      assert.equal(template('<%= hyphenate("foo-bar-baz") %>', imports)(), 'foo-bar-baz');
      assert.equal(template('<%= hyphenate("-foo bar baz-") %>', imports)(), 'foo-bar-baz');
    });

    it('should work with other non-word characters.', function() {
      assert.equal(template('<%= hyphenate("9foo-bar_baz") %>', imports)(), '9foo-bar_baz');
      assert.equal(template('<%= hyphenate("_foo_bar_baz-") %>', imports)(), 'foo_bar_baz');
    });
  });

  describe('slugify', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= slugify() %>', imports)(), '');
    });
    it('should slugify the characters in a string.', function() {
      assert.equal(template('<%= slugify("foo bar baz") %>', imports)(), 'foo-bar-baz');
    });
    it('should work with hyphens.', function() {
      assert.equal(template('<%= slugify("foo-bar-baz") %>', imports)(), 'foo-bar-baz');
      assert.equal(template('<%= slugify("-foo bar baz-") %>', imports)(), 'foo-bar-baz');
    });

    it('should work with other non-word characters.', function() {
      assert.equal(template('<%= slugify("9foo-bar_baz") %>', imports)(), '9foo-bar-baz');
      assert.equal(template('<%= slugify("_foo_bar_baz-") %>', imports)(), 'foo-bar-baz');
    });
  });

  describe('count', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= count() %>', imports)(), '');
    });
    it('should return zero when the substring is undefined.', function() {
      assert.equal(template('<%= count("ababa") %>', imports)(), '0');
    });
    it('should count the occurrances of a substring.', function() {
      assert.equal(template('<%= count("ababa", "a") %>', imports)(), '3');
      assert.equal(template('<%= count("abab", "a") %>', imports)(), '2');
      assert.equal(template('<%= count("ababaa", "a") %>', imports)(), '4');
    });
  });

  describe('reverse', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= reverse() %>', imports)(), '');
    });
    it('should reverse the characters in a string.', function() {
      assert.equal(template('<%= reverse("abc") %>', imports)(), 'cba');
    });
  });

  describe('wordwrap', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= wordwrap() %>', imports)(), '');
    });
    it('should wrap words to the specified width.', function() {
      var actual = template('<%= wordwrap("a b c d e f", {width: 5}) %>', imports)();
      assert.equal(actual, '  a b c \n  d e f');
    });

    it('should use custom newline characters.', function() {
      var actual = template('<%= wordwrap("a b c d e f", {width: 5, newline: "<br>  "}) %>', imports)();
      assert.equal(actual, '  a b c <br>  d e f');
    });
  });

  describe('align', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= rightAlign() %>', imports)(), '');
      assert.equal(template('<%= centerAlign() %>', imports)(), '');
    });
    it('should right align the characters in a string.', function() {
      var actual = template('<%= rightAlign("foo\\nbarbazb") %>', imports)();
      assert.equal(actual, '    foo\nbarbazb');
    });
    it('should center align the characters in a string.', function() {
      var actual = template('<%= centerAlign("foo\\nbarbazb") %>', imports)();
      assert.equal(actual, '  foo\nbarbazb');
    });
  });

  describe('replace', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= replace() %>', imports)(), '');
    });
    it('should return the string when no replacement pattern is passed.', function() {
      var actual = template('<%= replace("abcabc") %>', imports)();
      assert.equal(actual, 'abcabc');
    });
    it('should replace characters in a string with nothing.', function() {
      var actual = template('<%= replace("abcabc", "a") %>', imports)();
      assert.equal(actual, 'bcbc');
    });
    it('should replace characters in a string with a string', function() {
      var actual = template('<%= replace("abcabc", "a", "z") %>', imports)();
      assert.equal(actual, 'zbczbc');
    });
  });

  describe('titlecase', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= titlecase("foo") %>', imports)(), 'Foo');
    });
    it('should upper case the characters in a string.', function() {
      var fn = template('<%= titlecase("one two three") %>', imports);
      assert.equal(fn(), 'One Two Three');
    });
  });

  describe('truncate', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= truncate() %>', imports)(), '');
    });
    it('should truncate a string to the specified `length`', function() {
      assert.equal(template('<%= truncate("foo bar baz", 7) %>', imports)(), 'foo bar');
      assert.equal(template('<%= truncate(sanitize("<span>foo bar baz</span>"), 7) %>', imports)(), 'foo bar');
    });
  });

  describe('ellipsis', function() {
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= ellipsis() %>', imports)(), '');
    });
    it('should truncate a string to the specified `length` and add an ellipsis.', function() {
      assert.equal(template('<%= ellipsis("foo bar baz", 7) %>', imports)(), 'foo bar…');
      assert.equal(template('<%= ellipsis(sanitize("<span>foo bar baz</span>"), 7) %>', imports)(), 'foo bar…');
    });
  });
});

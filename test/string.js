/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var _ = require('lodash');
var helpers = require('..')(['string', 'html']);
require('should');

var imports = {imports: helpers};

describe('string helpers', function() {
  describe('lowercase', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= lowercase() %>', imports)().should.equal('');
    });
    it('should lower case the characters in a string.', function() {
      var template = _.template('<%= lowercase("ABC") %>', imports);
      template().should.equal('abc');
    });
  });

  describe('uppercase', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= uppercase() %>', imports)().should.equal('');
    });
    it('should upper case the characters in a string.', function() {
      var template = _.template('<%= uppercase("abc") %>', imports);
      template().should.equal('ABC');
    });
  });

  describe('trim', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= trim() %>', imports)().should.equal('');
    });
    it('should strip leading whitespace from a string.', function() {
      var template = _.template('<%= trim("    abc") %>', imports);
      template().should.equal('abc');
    });
    it('should strip trailing whitespace from a string.', function() {
      var template = _.template('<%= trim("abc   ") %>', imports);
      template().should.equal('abc');
    });
  });

  describe('chop', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= chop() %>', imports)().should.equal('');
    });
    it('should strip leading whitespace from a string.', function() {
      var template = _.template('<%= chop("    abc") %>', imports);
      template().should.equal('abc');
    });
    it('should strip trailing whitespace from a string.', function() {
      var template = _.template('<%= chop("abc   ") %>', imports);
      template().should.equal('abc');
    });
    it('should strip leading non-word characters from a string.', function() {
      var template = _.template('<%= chop("_-abc") %>', imports);
      template().should.equal('abc');
    });
    it('should strip trailing non-word characters from a string.', function() {
      var template = _.template('<%= chop("abc_-") %>', imports);
      template().should.equal('abc');
    });
  });

  describe('stripIndent', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= stripIndent() %>', imports)().should.equal('');
    });
    it('should strip indentation from a string.', function() {
      var template = _.template('<%= stripIndent(str) %>', imports)({str: [
        '       - a',
        '       - b',
        '         * c',
        '         * d',
        '           + e',
        '           + f'
      ].join('\n')});
      template.should.equal([
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
      _.template('<%= camelcase() %>', imports)().should.equal('');
    });
    it('should camel-case the characters in a string.', function() {
      _.template('<%= camelcase("foo bar baz") %>', imports)().should.equal('fooBarBaz');
    });
    it('should camel-case the characters in a string.', function() {
      _.template('<%= camelcase("A") %>', imports)().should.equal('a');
    });
    it('should work with hyphens.', function() {
      _.template('<%= camelcase("foo-bar-baz") %>', imports)().should.equal('fooBarBaz');
      _.template('<%= camelcase("-foo bar baz-") %>', imports)().should.equal('fooBarBaz');
    });

    it('should work with other non-word characters.', function() {
      _.template('<%= camelcase("9foo-bar_baz") %>', imports)().should.equal('9fooBarBaz');
      _.template('<%= camelcase("_foo_bar_baz-") %>', imports)().should.equal('fooBarBaz');
    });
  });

  describe('pascalcase', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= pascalcase() %>', imports)().should.equal('');
    });
    it('should camel-case the characters in a string.', function() {
      _.template('<%= pascalcase("a") %>', imports)().should.equal('A');
      _.template('<%= pascalcase("A") %>', imports)().should.equal('A');
    });
    it('should pascal-case the characters in a string.', function() {
      _.template('<%= pascalcase("foo bar baz") %>', imports)().should.equal('FooBarBaz');
    });
    it('should work with hyphens.', function() {
      _.template('<%= pascalcase("foo-bar-baz") %>', imports)().should.equal('FooBarBaz');
      _.template('<%= pascalcase("-foo bar baz-") %>', imports)().should.equal('FooBarBaz');
    });

    it('should work with other non-word characters.', function() {
      _.template('<%= pascalcase("9foo-bar_baz") %>', imports)().should.equal('9fooBarBaz');
      _.template('<%= pascalcase("_foo_bar_baz-") %>', imports)().should.equal('FooBarBaz');
    });
  });

  describe('snakecase', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= snakecase() %>', imports)().should.equal('');
    });
    it('should camel-case the characters in a string.', function() {
      _.template('<%= snakecase("A") %>', imports)().should.equal('a');
    });
    it('should snake-case the characters in a string.', function() {
      _.template('<%= snakecase("foo bar baz") %>', imports)().should.equal('foo_bar_baz');
    });
    it('should work with hyphens.', function() {
      _.template('<%= snakecase("foo-bar-baz") %>', imports)().should.equal('foo_bar_baz');
      _.template('<%= snakecase("-foo bar baz-") %>', imports)().should.equal('foo_bar_baz');
    });

    it('should work with other non-word characters.', function() {
      _.template('<%= snakecase("9foo-bar_baz") %>', imports)().should.equal('9foo_bar_baz');
      _.template('<%= snakecase("_foo_bar_baz-") %>', imports)().should.equal('foo_bar_baz');
    });
  });

  describe('dotcase', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= dotcase() %>', imports)().should.equal('');
    });
    it('should camel-case the characters in a string.', function() {
      _.template('<%= dotcase("A") %>', imports)().should.equal('a');
    });
    it('should dot-case the characters in a string.', function() {
      _.template('<%= dotcase("foo bar baz") %>', imports)().should.equal('foo.bar.baz');
    });
    it('should work with hyphens.', function() {
      _.template('<%= dotcase("foo-bar-baz") %>', imports)().should.equal('foo.bar.baz');
      _.template('<%= dotcase("-foo bar baz-") %>', imports)().should.equal('foo.bar.baz');
    });

    it('should work with other non-word characters.', function() {
      _.template('<%= dotcase("9foo-bar_baz") %>', imports)().should.equal('9foo.bar.baz');
      _.template('<%= dotcase("_foo_bar_baz-") %>', imports)().should.equal('foo.bar.baz');
    });
  });

  describe('dashcase', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= dashcase() %>', imports)().should.equal('');
    });
    it('should camel-case the characters in a string.', function() {
      _.template('<%= dashcase("A") %>', imports)().should.equal('a');
    });
    it('should dash-case the characters in a string.', function() {
      _.template('<%= dashcase("foo bar baz") %>', imports)().should.equal('foo-bar-baz');
    });
    it('should work with hyphens.', function() {
      _.template('<%= dashcase("foo-bar-baz") %>', imports)().should.equal('foo-bar-baz');
      _.template('<%= dashcase("-foo bar baz-") %>', imports)().should.equal('foo-bar-baz');
    });

    it('should work with other non-word characters.', function() {
      _.template('<%= dashcase("9foo-bar_baz") %>', imports)().should.equal('9foo-bar-baz');
      _.template('<%= dashcase("_foo_bar_baz-") %>', imports)().should.equal('foo-bar-baz');
    });
  });

  describe('pathcase', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= pathcase() %>', imports)().should.equal('');
    });
    it('should camel-case the characters in a string.', function() {
      _.template('<%= pathcase("A") %>', imports)().should.equal('a');
    });
    it('should path-case the characters in a string.', function() {
      _.template('<%= pathcase("foo bar baz") %>', imports)().should.equal('foo/bar/baz');
    });
    it('should work with hyphens.', function() {
      _.template('<%= pathcase("foo-bar-baz") %>', imports)().should.equal('foo/bar/baz');
      _.template('<%= pathcase("-foo bar baz-") %>', imports)().should.equal('foo/bar/baz');
    });

    it('should work with other non-word characters.', function() {
      _.template('<%= pathcase("9foo-bar_baz") %>', imports)().should.equal('9foo/bar/baz');
      _.template('<%= pathcase("_foo_bar_baz-") %>', imports)().should.equal('foo/bar/baz');
    });
  });

  describe('sentencecase', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= sentencecase() %>', imports)().should.equal('');
    });
    it('should camel-case the characters in a string.', function() {
      _.template('<%= sentencecase("A") %>', imports)().should.equal('A');
      _.template('<%= sentencecase("a") %>', imports)().should.equal('A');
    });
    it('should sentence-case the characters in a string.', function() {
      _.template('<%= sentencecase("foo bar baz.") %>', imports)().should.equal('Foo bar baz.');
      _.template('<%= sentencecase("a") %>', imports)().should.equal('A');
    });
  });

  describe('hyphenate', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= hyphenate() %>', imports)().should.equal('');
    });
    it('should hyphenate the characters in a string.', function() {
      _.template('<%= hyphenate("foo bar baz") %>', imports)().should.equal('foo-bar-baz');
    });
    it('should work with hyphens.', function() {
      _.template('<%= hyphenate("foo-bar-baz") %>', imports)().should.equal('foo-bar-baz');
      _.template('<%= hyphenate("-foo bar baz-") %>', imports)().should.equal('foo-bar-baz');
    });

    it('should work with other non-word characters.', function() {
      _.template('<%= hyphenate("9foo-bar_baz") %>', imports)().should.equal('9foo-bar_baz');
      _.template('<%= hyphenate("_foo_bar_baz-") %>', imports)().should.equal('foo_bar_baz');
    });
  });

  describe('slugify', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= slugify() %>', imports)().should.equal('');
    });
    it('should slugify the characters in a string.', function() {
      _.template('<%= slugify("foo bar baz") %>', imports)().should.equal('foo-bar-baz');
    });
    it('should work with hyphens.', function() {
      _.template('<%= slugify("foo-bar-baz") %>', imports)().should.equal('foo-bar-baz');
      _.template('<%= slugify("-foo bar baz-") %>', imports)().should.equal('foo-bar-baz');
    });

    it('should work with other non-word characters.', function() {
      _.template('<%= slugify("9foo-bar_baz") %>', imports)().should.equal('9foo-bar-baz');
      _.template('<%= slugify("_foo_bar_baz-") %>', imports)().should.equal('foo-bar-baz');
    });
  });

  describe('count', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= count() %>', imports)().should.equal('');
    });
    it('should return zero when the substring is undefined.', function() {
      _.template('<%= count("ababa") %>', imports)().should.equal('0');
    });
    it('should count the occurrances of a substring.', function() {
      _.template('<%= count("ababa", "a") %>', imports)().should.equal('3');
      _.template('<%= count("abab", "a") %>', imports)().should.equal('2');
      _.template('<%= count("ababaa", "a") %>', imports)().should.equal('4');
    });
  });

  describe('reverse', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= reverse() %>', imports)().should.equal('');
    });
    it('should reverse the characters in a string.', function() {
      _.template('<%= reverse("abc") %>', imports)().should.equal('cba');
    });
  });

  describe('wordwrap', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= wordwrap() %>', imports)().should.equal('');
    });
    it('should wrap words to the specified width.', function() {
      var actual = _.template('<%= wordwrap("a b c d e f", {width: 5}) %>', imports)();
      actual.should.equal('  a b c \n  d e f');
    });

    it('should use custom newline characters.', function() {
      var actual = _.template('<%= wordwrap("a b c d e f", {width: 5, newline: "<br>  "}) %>', imports)();
      actual.should.equal('  a b c <br>  d e f');
    });
  });

  describe('align', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= rightAlign() %>', imports)().should.equal('');
      _.template('<%= centerAlign() %>', imports)().should.equal('');
    });
    it('should right align the characters in a string.', function() {
      var actual = _.template('<%= rightAlign("foo\\nbarbazb") %>', imports)();
      actual.should.equal('    foo\nbarbazb');
    });
    it('should center align the characters in a string.', function() {
      var actual = _.template('<%= centerAlign("foo\\nbarbazb") %>', imports)();
      actual.should.equal('  foo\nbarbazb');
    });
  });

  describe('replace', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= replace() %>', imports)().should.equal('');
    });
    it('should return the string when no replacement pattern is passed.', function() {
      var actual = _.template('<%= replace("abcabc") %>', imports)();
      actual.should.equal('abcabc');
    });
    it('should replace characters in a string with nothing.', function() {
      var actual = _.template('<%= replace("abcabc", "a") %>', imports)();
      actual.should.equal('bcbc');
    });
    it('should replace characters in a string with a string', function() {
      var actual = _.template('<%= replace("abcabc", "a", "z") %>', imports)();
      actual.should.equal('zbczbc');
    });
  });

  describe('titlecase', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= titlecase("foo") %>', imports)().should.equal('Foo');
    });
    it('should upper case the characters in a string.', function() {
      var template = _.template('<%= titlecase("one two three") %>', imports);
      template().should.equal('One Two Three');
    });
  });

  describe('truncate', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= truncate() %>', imports)().should.equal('');
    });
    it('should truncate a string to the specified `length`', function() {
      _.template('<%= truncate("foo bar baz", 7) %>', imports)().should.equal('foo bar');
      _.template('<%= truncate(sanitize("<span>foo bar baz</span>"), 7) %>', imports)().should.equal('foo bar');
    });
  });

  describe('ellipsis', function() {
    it('should return an empty string when undefined.', function() {
      _.template('<%= ellipsis() %>', imports)().should.equal('');
    });
    it('should truncate a string to the specified `length` and add an ellipsis.', function() {
      _.template('<%= ellipsis("foo bar baz", 7) %>', imports)().should.equal('foo bar…');
      _.template('<%= ellipsis(sanitize("<span>foo bar baz</span>"), 7) %>', imports)().should.equal('foo bar…');
    });
  });
});

/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var _ = require('lodash');
var helpers = require('..');
require('should');

var imports = {imports: helpers.string};

describe('string helpers', function() {
  describe('toString', function() {
    it.skip('should cast a value to a string.', function() {
      var template = _.template('<%= toString(a) %>', imports);
      template({a: null}).should.equal('');
    });
  });

  describe('lowercase', function() {
    it('should lower case the characters in a string.', function() {
      var template = _.template('<%= lowercase("ABC") %>', imports);
      template().should.equal('abc');
    });
  });

  describe('uppercase', function() {
    it('should upper case the characters in a string.', function() {
      var template = _.template('<%= uppercase("abc") %>', imports);
      template().should.equal('ABC');
    });
  });

  describe('trim', function() {
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

  describe('camelcase', function() {
    it('should camel-case the characters in a string.', function() {
      _.template('<%= camelcase("foo bar baz") %>', imports)().should.equal('fooBarBaz');
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
    it('should sentence-case the characters in a string.', function() {
      _.template('<%= sentencecase("foo bar baz.") %>', imports)().should.equal('Foo bar baz.');
      _.template('<%= sentencecase("a") %>', imports)().should.equal('A');
    });
  });

  describe('hyphenate', function() {
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
    it('should count the occurrances of a substring.', function() {
      _.template('<%= count("ababa", "a") %>', imports)().should.equal('3');
      _.template('<%= count("abab", "a") %>', imports)().should.equal('2');
      _.template('<%= count("ababaa", "a") %>', imports)().should.equal('4');
    });
  });

  describe('reverse', function() {
    it('should reverse the characters in a string.', function() {
      _.template('<%= reverse("abc") %>', imports)().should.equal('cba');
    });
  });

  describe('wordwrap', function() {
    it('should wrap words to the specified width.', function() {
      var actual = _.template('<%= wordwrap("a b c d e f", {width: 5}) %>', imports)()
      actual.should.equal('  a b c \n  d e f');
    });

    it('should use custom newline characters.', function() {
      var actual = _.template('<%= wordwrap("a b c d e f", {width: 5, newline: "<br>  "}) %>', imports)()
      actual.should.equal('  a b c <br>  d e f');
    });
  });

  describe('align', function() {
    it.skip('should right align the characters in a string.', function() {
      var actual = _.template('<%= rightAlign("foo\nbarbazb") %>', imports)()
      actual.should.equal('    foo\nbarbazb');
    });
    it.skip('should center align the characters in a string.', function() {
      var actual = _.template('<%= centerAlign("foo\nbarbazb") %>', imports)()
      actual.should.equal('  foo  \nbarbazb');
    });
  });

  describe('replace', function() {
    it('should replace characters in a string using regex.', function() {
      var actual = _.template('<%= replace("abcabc", /a/, "z") %>', imports)()
      actual.should.equal('zbczbc');
    });
    it('should replace characters in a string with a string', function() {
      var actual = _.template('<%= replace("abcabc", "a", "z") %>', imports)()
      actual.should.equal('zbczbc');
    });
  });

  describe('sanitize', function() {
    it('should strip html from a string.', function() {
      var actual = _.template('<%= sanitize("<span>foo</span>") %>', imports)()
      actual.should.equal('foo');
    });
  });

  describe('truncate', function() {
    it('should truncate a string to the specified `length`', function() {
      var actual = _.template('<%= truncate("<span>foo bar baz</span>", 7) %>', imports)()
      actual.should.equal('foo bar');
    });
  });

  describe('ellipsis', function() {
    it('should truncate a string to the specified `length` and add an ellipsis.', function() {
      var actual = _.template('<%= ellipsis("<span>foo bar baz</span>", 7) %>', imports)()
      actual.should.equal('foo bar…');
    });
  });
});
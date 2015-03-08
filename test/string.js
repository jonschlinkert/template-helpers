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

  describe('count', function() {
    it('should count the occurrances of a substring.', function() {
      _.template('<%= count("ababa", "a") %>', imports)().should.equal('3');
      _.template('<%= count("abab", "a") %>', imports)().should.equal('2');
      _.template('<%= count("ababaa", "a") %>', imports)().should.equal('4');
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
});

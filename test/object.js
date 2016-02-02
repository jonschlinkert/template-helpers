/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var helpers = require('..')('object');
var _ = require('lodash');

var context = {obj: {a: 'a', b: 'b', c: {d: {e: 'e'}}}};
var imports = {imports: helpers};

describe('objects', function() {
  describe('fallback', function() {
    it('should use the fallback value when the first value is undefined.', function() {
      _.template('<%= fallback(a.b) %>', imports)({a: {b: 'b'}}).should.equal('b');
      _.template('<%= fallback(a.z, a.b) %>', imports)({a: {b: 'b'}}).should.equal('b');
      _.template('<%= fallback(x.k, x.z) %>', imports)({x: {z: 'z'}}).should.equal('z');
    });
  });

  describe('stringify', function() {
    it('should stringify an object.', function() {
      _.template('<%= stringify({a: "a"}) %>', imports)(context).should.equal('{"a":"a"}');
      _.template('<%= stringify(obj.c) %>', imports)(context).should.equal('{"d":{"e":"e"}}');
    });
  });

  describe('parse', function() {
    it('should parse a string to an object:', function() {
      _.template('<%= parse(\'{"foo":"bar"}\') %>', imports)(context).should.equal('[object Object]');
      _.template('<%= parse(\'{"foo":"bar"}\')["foo"] %>', imports)(context).should.equal('bar');
    });
  });

  describe('isObject', function() {
    it('should return true if the value is an object.', function() {
      _.template('<%= isObject(obj) %>', imports)(context).should.equal('true');
      _.template('<%= isObject([]) %>', imports)(context).should.equal('false');
      _.template('<%= isObject("foo") %>', imports)(context).should.equal('false');
    });
  });

  describe('isPlainObject', function() {
    it('should return true if the value is a plain object.', function() {
      _.template('<%= isPlainObject(obj) %>', imports)(context).should.equal('true');
      _.template('<%= isPlainObject([]) %>', imports)(context).should.equal('false');
      _.template('<%= isPlainObject(/foo/) %>', imports)(context).should.equal('false');
      _.template('<%= isPlainObject("foo") %>', imports)(context).should.equal('false');
    });
  });

  describe('hasOwn', function() {
    it('should return true when an object has own property `key`.', function() {
      _.template('<%= hasOwn(obj, "a") %>', imports)(context).should.equal('true');
      _.template('<%= hasOwn(obj, "k") %>', imports)(context).should.equal('false');
    });
  });

  describe('keys', function() {
    it('should return the keys of an object.', function() {
      _.template('<%= keys(obj) %>', imports)(context).should.equal(['a', 'b', 'c'].toString());
    });
  });

  describe('forIn', function() {
    it('should expose the keys on an object.', function() {
      var context = {values: {a: 'b', c: 'd'}}
      var actual = _.template('<% forIn(values, function(val, key) { %><%= key %><% }) %>', imports)(context);
      actual.should.equal('ac');
    });

    it('should expose the values on an object.', function() {
      var context = {values: {a: 'b', c: 'd'}}
      var actual = _.template('<% forIn(values, function(val, key) { %><%= val %><% }) %>', imports)(context);
      actual.should.equal('bd');
    });
  });

  describe('forOwn', function() {
    it('should expose the keys on an object.', function() {
      var context = {values: {a: 'b', c: 'd'}}
      var actual = _.template('<% forOwn(values, function(val, key) { %><%= key %><% }) %>', imports)(context);
      actual.should.equal('ac');
    });

    it('should expose the values on an object.', function() {
      var context = {values: {a: 'b', c: 'd'}}
      var actual = _.template('<% forOwn(values, function(val, key) { %><%= val %><% }) %>', imports)(context);
      actual.should.equal('bd');
    });
  });

  describe('omit', function() {
    it('should omit keys from an object.', function() {
      var actual = _.template('<%= stringify(omit(obj, ["b", "c"])) %>', imports)(context);
      actual.should.equal('{"a":"a"}');
    });
  });

  describe('extend', function() {
    beforeEach(function() {
      context.foo = {aaa: 'bbb'};
      context.bar = {ccc: 'ddd'};
    });
    it('should return an empty string when undefined.', function() {
      _.template('<%= extend() %>', imports)().should.equal('');
    });

    it('should ignore non-objects.', function() {
      var actual = _.template('<%= stringify(extend(foo, bar, "baz")) %>', imports)(context);
      actual.should.equal('{"aaa":"bbb","ccc":"ddd"}');
    });

    it('should extend the first object with the second.', function() {
      var actual = _.template('<%= stringify(extend(foo, bar)) %>', imports)(context);
      actual.should.equal('{"aaa":"bbb","ccc":"ddd"}');
    });

    it('should use the extended object as context.', function() {
      // overwrite `foo`
      context.bar = {aaa: 'ddd'};
      var actual = _.template('<%= get(extend(foo, bar), "aaa") %>', imports)(context);
      actual.should.equal('ddd');
    });
  });

  describe('merge', function() {
    beforeEach(function() {
      context.foo = {aaa: 'bbb', bbb: {ccc: {ddd: 'eee'}}};
      context.bar = {aaa: 'bbb', bbb: {ccc: {eee: 'fff'}}};
      context.baz = {aaa: 'bbb', bbb: {ccc: {fff: 'ggg'}}};
    });
    it('should return an empty string when undefined.', function() {
      _.template('<%= merge() %>', imports)().should.equal('');
    });
    it('should merge objects.', function() {
      var actual = _.template('<%= stringify(merge(foo, bar)) %>', imports)(context);
      actual.should.equal('{"aaa":"bbb","bbb":{"ccc":{"ddd":"eee","eee":"fff"}}}');
    });
    it('should merge multiple objects:', function() {
      var actual = _.template('<%= stringify(merge(foo, bar, baz)) %>', imports)(context);
      actual.should.equal('{"aaa":"bbb","bbb":{"ccc":{"ddd":"eee","eee":"fff","fff":"ggg"}}}');
    });
  });
});

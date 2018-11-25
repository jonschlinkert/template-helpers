/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var assert = require('assert');
var helpers = require('..')('object');
var template = require('lodash.template');

var context = {obj: {a: 'a', b: 'b', c: {d: {e: 'e'}}}};
var imports = {imports: helpers};

describe('objects', function() {
  describe('fallback', function() {
    it('should use the fallback value when the first value is undefined.', function() {
      assert.equal(template('<%= fallback(a.b) %>', imports)({a: {b: 'b'}}), 'b');
      assert.equal(template('<%= fallback(a.z, a.b) %>', imports)({a: {b: 'b'}}), 'b');
      assert.equal(template('<%= fallback(x.k, x.z) %>', imports)({x: {z: 'z'}}), 'z');
    });
  });

  describe('stringify', function() {
    it('should stringify an object.', function() {
      assert.equal(template('<%= stringify({a: "a"}) %>', imports)(context), '{"a":"a"}');
      assert.equal(template('<%= stringify(obj.c) %>', imports)(context), '{"d":{"e":"e"}}');
    });
  });

  describe('parse', function() {
    it('should parse a string to an object:', function() {
      assert.equal(template('<%= parse(\'{"foo":"bar"}\') %>', imports)(context), '[object Object]');
      assert.equal(template('<%= parse(\'{"foo":"bar"}\')["foo"] %>', imports)(context), 'bar');
    });
  });

  describe('isObject', function() {
    it('should return true if the value is an object.', function() {
      assert.equal(template('<%= isObject(obj) %>', imports)(context), 'true');
      assert.equal(template('<%= isObject([]) %>', imports)(context), 'false');
      assert.equal(template('<%= isObject("foo") %>', imports)(context), 'false');
    });
  });

  describe('isPlainObject', function() {
    it('should return true if the value is a plain object.', function() {
      assert.equal(template('<%= isPlainObject(obj) %>', imports)(context), 'true');
      assert.equal(template('<%= isPlainObject([]) %>', imports)(context), 'false');
      assert.equal(template('<%= isPlainObject(/foo/) %>', imports)(context), 'false');
      assert.equal(template('<%= isPlainObject("foo") %>', imports)(context), 'false');
    });
  });

  describe('hasOwn', function() {
    it('should return true when an object has own property `key`.', function() {
      assert.equal(template('<%= hasOwn(obj, "a") %>', imports)(context), 'true');
      assert.equal(template('<%= hasOwn(obj, "k") %>', imports)(context), 'false');
    });
  });

  describe('keys', function() {
    it('should return the keys of an object.', function() {
      assert.equal(template('<%= keys(obj) %>', imports)(context), ['a', 'b', 'c'].toString());
    });
  });

  describe('forIn', function() {
    it('should expose the keys on an object.', function() {
      var context = {values: {a: 'b', c: 'd'}}
      var actual = template('<% forIn(values, function(val, key) { %><%= key %><% }) %>', imports)(context);
      assert.equal(actual, 'ac');
    });

    it('should expose the values on an object.', function() {
      var context = {values: {a: 'b', c: 'd'}}
      var actual = template('<% forIn(values, function(val, key) { %><%= val %><% }) %>', imports)(context);
      assert.equal(actual, 'bd');
    });
  });

  describe('forOwn', function() {
    it('should expose the keys on an object.', function() {
      var context = { values: { a: 'b', c: 'd' } };
      var actual = template('<% forOwn(values, function(val, key) { %><%= key %><% }) %>', imports)(context);
      assert.equal(actual, 'ac');
    });

    it('should expose the values on an object.', function() {
      var context = {values: {a: 'b', c: 'd'}}
      var actual = template('<% forOwn(values, function(val, key) { %><%= val %><% }) %>', imports)(context);
      assert.equal(actual, 'bd');
    });
  });

  describe('omit', function() {
    it('should omit keys from an object.', function() {
      var actual = template('<%= stringify(omit(obj, ["b", "c"])) %>', imports)(context);
      assert.equal(actual, '{"a":"a"}');
    });
  });

  describe('extend', function() {
    beforeEach(function() {
      context.foo = {aaa: 'bbb'};
      context.bar = {ccc: 'ddd'};
    });
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= extend() %>', imports)(), '');
    });

    it('should ignore non-objects.', function() {
      var actual = template('<%= stringify(extend(foo, bar, "baz")) %>', imports)(context);
      assert.equal(actual, '{"aaa":"bbb","ccc":"ddd"}');
    });

    it('should extend the first object with the second.', function() {
      var actual = template('<%= stringify(extend(foo, bar)) %>', imports)(context);
      assert.equal(actual, '{"aaa":"bbb","ccc":"ddd"}');
    });

    it('should use the extended object as context.', function() {
      // overwrite `foo`
      context.bar = {aaa: 'ddd'};
      var actual = template('<%= get(extend(foo, bar), "aaa") %>', imports)(context);
      assert.equal(actual, 'ddd');
    });
  });

  describe('merge', function() {
    beforeEach(function() {
      context.foo = {aaa: 'bbb', bbb: {ccc: {ddd: 'eee'}}};
      context.bar = {aaa: 'bbb', bbb: {ccc: {eee: 'fff'}}};
      context.baz = {aaa: 'bbb', bbb: {ccc: {fff: 'ggg'}}};
    });
    it('should return an empty string when undefined.', function() {
      assert.equal(template('<%= merge() %>', imports)(), '');
    });
    it('should merge objects.', function() {
      var actual = template('<%= stringify(merge(foo, bar)) %>', imports)(context);
      assert.equal(actual, '{"aaa":"bbb","bbb":{"ccc":{"ddd":"eee","eee":"fff"}}}');
    });
    it('should merge multiple objects:', function() {
      var actual = template('<%= stringify(merge(foo, bar, baz)) %>', imports)(context);
      assert.equal(actual, '{"aaa":"bbb","bbb":{"ccc":{"ddd":"eee","eee":"fff","fff":"ggg"}}}');
    });
  });
});

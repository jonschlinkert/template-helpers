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


var context = {obj: {a: 'a', b: 'b', c: {d: {e: 'e'}}}};
var imports = {imports: helpers.objects};

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

describe('isObject', function() {
  it('should return true if the value is an object.', function() {
    _.template('<%= isObject(obj) %>', imports)(context).should.equal('true');
    _.template('<%= isObject([]) %>', imports)(context).should.equal('false');
    _.template('<%= isObject("foo") %>', imports)(context).should.equal('false');
  });
});

describe('extend', function() {
  beforeEach(function () {
    context.foo = {aaa: 'bbb'};
    context.bar = {ccc: 'ddd'};
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
  beforeEach(function () {
    context.foo = {aaa: 'bbb', bbb: {ccc: {ddd: 'eee'}}};
    context.bar = {aaa: 'bbb', bbb: {ccc: {eee: 'fff'}}};
  });

  it('should merge the first object with the second.', function() {
    var actual = _.template('<%= stringify(merge(foo, bar)) %>', imports)(context);
    actual.should.equal('{"aaa":"bbb","bbb":{"ccc":{"ddd":"eee","eee":"fff"}}}');
  });
});

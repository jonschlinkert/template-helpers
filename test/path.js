/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var _ = require('lodash');
var path = require('path');
var helpers = require('..');
require('should');

var imports = {imports: helpers};

describe('path helpers', function() {
  describe('join', function() {
    it('should join the given paths:', function() {
      _.template('<%= path.join("a", "b") %>', imports)().should.equal('a/b');
    });
  });
  describe('dirname', function() {
    it('should return the dirname:', function() {
      _.template('<%= path.dirname("a/b/c/e.js") %>', imports)().should.equal('a/b/c');
    });
  });
  describe('basename', function() {
    it('should return the basename:', function() {
      _.template('<%= path.basename("a/b/c/e.js") %>', imports)().should.equal('e.js');
    });
  });
  describe('filename', function() {
    it('should return the filename:', function() {
      _.template('<%= path.filename("a/b/c/e.js") %>', imports)().should.equal('e');
    });
  });
  describe('extname', function() {
    it('should return the extname with dot:', function() {
      _.template('<%= path.extname("a/b/c/e.js") %>', imports)().should.equal('.js');
    });
  });
  describe('ext', function() {
    it('should return the extension without dot:', function() {
      _.template('<%= path.ext("a/b/c/e.js") %>', imports)().should.equal('js');
    });
  });
  describe('segments', function() {
    it('should return specified path segments:', function() {
      _.template('<%= path.segments("a/b/c/e.js", 1, 3) %>', imports)().should.equal('b/c');
      _.template('<%= path.segments("a/b/c/e.js", 1, 2) %>', imports)().should.equal('b');
      _.template('<%= path.segments("a/b/c/e.js", 0, 3) %>', imports)().should.equal('a/b/c');
      _.template('<%= path.segments("a/b/c/e.js", 2, 3) %>', imports)().should.equal('c');
      _.template('<%= path.segments("a/b/c/e.js", 0, 3) %>', imports)().should.equal('a/b/c');
    });

    it('should disregard extra slashes:', function() {
      _.template('<%= path.segments("a///b\\/c\\/e.js", 1, 3) %>', imports)().should.equal('b/c');
      _.template('<%= path.segments("a///b/\\//c/e.js", 1, 2) %>', imports)().should.equal('b');
    });
  });
  describe('isAbsolute', function() {
    it('should return the extname of the given path:', function() {
      _.template('<%= path.isAbsolute("/foo/bar") %>', imports)().should.equal('true');
      _.template('<%= path.isAbsolute("/baz/..") %>', imports)().should.equal('true');
      _.template('<%= path.isAbsolute("qux/") %>', imports)().should.equal('false');
      _.template('<%= path.isAbsolute(".") %>', imports)().should.equal('false');
      _.template('<%= path.isAbsolute("//server") %>', imports)().should.equal('true');
      _.template('<%= path.isAbsolute("bar\\baz") %>', imports)().should.equal('false');
      _.template('<%= path.isAbsolute(".") %>', imports)().should.equal('false');
    });
  });
  describe('extname', function() {
    it('should resolve the given path(s):', function() {
      _.template('<%= path.resolve("c/e.js") %>', imports)().should.equal(path.resolve('c/e.js'));
    });
  });
  describe('relative', function() {
    it('should return a relative file path:', function() {
      _.template('<%= path.relative("docs/", "docs/a/b.js") %>', imports)().should.equal('a/b.js');
      _.template('<%= path.relative("docs/a/b.js", "docs/") %>', imports)().should.equal('..');
    });
  });
});

/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

const path = require('path');
const assert = require('assert');
const template = require('lodash.template');
const helpers = require('..')('path');
const imports = { imports: helpers };

describe('path helpers', function() {
  if (process.platform === 'win32') {
    this.skip();
    return;
  }

  describe('dirname', function() {
    it('should return the dirname:', function() {
      assert.strictEqual(template('<%= dirname("a/b/c/e.js") %>', imports)(), 'a/b/c');
      assert.strictEqual(template('<%= path.dirname("a/b/c/e.js") %>', imports)(), 'a/b/c');
    });
  });
  describe('basename', function() {
    it('should return the basename:', function() {
      assert.strictEqual(template('<%= basename("a/b/c/e.js") %>', imports)(), 'e.js');
      assert.strictEqual(template('<%= path.basename("a/b/c/e.js") %>', imports)(), 'e.js');
    });
  });
  describe('filename', function() {
    it('should return the filename:', function() {
      assert.strictEqual(template('<%= filename("a/b/c/e.js") %>', imports)(), 'e');
      assert.strictEqual(template('<%= path.filename("a/b/c/e.js") %>', imports)(), 'e');
    });
  });
  describe('extname', function() {
    it('should return the extname with dot:', function() {
      assert.strictEqual(template('<%= extname("a/b/c/e.js") %>', imports)(), '.js');
      assert.strictEqual(template('<%= path.extname("a/b/c/e.js") %>', imports)(), '.js');
    });
  });
  describe('ext', function() {
    it('should return the extension without dot:', function() {
      assert.strictEqual(template('<%= ext("a/b/c/e.js") %>', imports)(), 'js');
      assert.strictEqual(template('<%= path.ext("a/b/c/e.js") %>', imports)(), 'js');
    });
  });
  describe('resolve', function() {
    it('should resolve the given path(s):', function() {
      assert.strictEqual(template('<%= resolve("c/e.js") %>', imports)(), path.resolve('c/e.js'));
      assert.strictEqual(template('<%= path.resolve("c/e.js") %>', imports)(), path.resolve('c/e.js'));
    });
  });
  describe('relative', function() {
    it('should return a relative file path:', function() {
      assert.strictEqual(template('<%= relative("docs/", "docs/a/b.js") %>', imports)(), 'a/b.js');
      assert.strictEqual(template('<%= path.relative("docs/", "docs/a/b.js") %>', imports)(), 'a/b.js');
      assert.strictEqual(template('<%= relative("docs/a/b.js", "docs/") %>', imports)(), '..');
      assert.strictEqual(template('<%= path.relative("docs/a/b.js", "docs/") %>', imports)(), '..');
    });
  });

  describe('isRelative', function() {
    it('should return true if a file path is isRelative:', function() {
      assert.strictEqual(template('<%= isRelative("/foo/bar") %>', imports)(), 'false');
      assert.strictEqual(template('<%= path.isRelative("/foo/bar") %>', imports)(), 'false');
      assert.strictEqual(template('<%= isRelative("/baz/..") %>', imports)(), 'false');
      assert.strictEqual(template('<%= path.isRelative("/baz/..") %>', imports)(), 'false');
      assert.strictEqual(template('<%= isRelative("qux/") %>', imports)(), 'true');
      assert.strictEqual(template('<%= path.isRelative("qux/") %>', imports)(), 'true');
      assert.strictEqual(template('<%= isRelative(".") %>', imports)(), 'true');
      assert.strictEqual(template('<%= path.isRelative(".") %>', imports)(), 'true');
      assert.strictEqual(template('<%= isRelative("//server") %>', imports)(), 'false');
      assert.strictEqual(template('<%= path.isRelative("//server") %>', imports)(), 'false');
      assert.strictEqual(template('<%= isRelative("bar\\baz") %>', imports)(), 'true');
      assert.strictEqual(template('<%= path.isRelative("bar\\baz") %>', imports)(), 'true');
      assert.strictEqual(template('<%= isRelative(".") %>', imports)(), 'true');
      assert.strictEqual(template('<%= path.isRelative(".") %>', imports)(), 'true');
    });
  });

  describe('isAbsolute', function() {
    it('should return true if a file path is absolute:', function() {
      assert.strictEqual(template('<%= isAbsolute("/foo/bar") %>', imports)(), 'true');
      assert.strictEqual(template('<%= path.isAbsolute("/foo/bar") %>', imports)(), 'true');
      assert.strictEqual(template('<%= isAbsolute("/baz/..") %>', imports)(), 'true');
      assert.strictEqual(template('<%= path.isAbsolute("/baz/..") %>', imports)(), 'true');
      assert.strictEqual(template('<%= isAbsolute("qux/") %>', imports)(), 'false');
      assert.strictEqual(template('<%= path.isAbsolute("qux/") %>', imports)(), 'false');
      assert.strictEqual(template('<%= isAbsolute(".") %>', imports)(), 'false');
      assert.strictEqual(template('<%= path.isAbsolute(".") %>', imports)(), 'false');
      assert.strictEqual(template('<%= isAbsolute("//server") %>', imports)(), 'true');
      assert.strictEqual(template('<%= path.isAbsolute("//server") %>', imports)(), 'true');
      assert.strictEqual(template('<%= isAbsolute("bar\\baz") %>', imports)(), 'false');
      assert.strictEqual(template('<%= path.isAbsolute("bar\\baz") %>', imports)(), 'false');
      assert.strictEqual(template('<%= isAbsolute(".") %>', imports)(), 'false');
      assert.strictEqual(template('<%= path.isAbsolute(".") %>', imports)(), 'false');
    });
  });

  describe('join', function() {
    it('should join the given paths:', function() {
      assert.strictEqual(template('<%= join("a", "b") %>', imports)(), 'a/b');
      assert.strictEqual(template('<%= path.join("a", "b") %>', imports)(), 'a/b');
    });
  });

  describe('segments', function() {
    it('should return specified path segments:', function() {
      assert.strictEqual(template('<%= segments("a/b/c/e.js", 1, 3) %>', imports)(), 'b/c');
      assert.strictEqual(template('<%= path.segments("a/b/c/e.js", 1, 3) %>', imports)(), 'b/c');
      assert.strictEqual(template('<%= segments("a/b/c/e.js", 1, 2) %>', imports)(), 'b');
      assert.strictEqual(template('<%= path.segments("a/b/c/e.js", 1, 2) %>', imports)(), 'b');
      assert.strictEqual(template('<%= segments("a/b/c/e.js", 0, 3) %>', imports)(), 'a/b/c');
      assert.strictEqual(template('<%= path.segments("a/b/c/e.js", 0, 3) %>', imports)(), 'a/b/c');
      assert.strictEqual(template('<%= segments("a/b/c/e.js", 2, 3) %>', imports)(), 'c');
      assert.strictEqual(template('<%= path.segments("a/b/c/e.js", 2, 3) %>', imports)(), 'c');
      assert.strictEqual(template('<%= segments("a/b/c/e.js", 0, 3) %>', imports)(), 'a/b/c');
      assert.strictEqual(template('<%= path.segments("a/b/c/e.js", 0, 3) %>', imports)(), 'a/b/c');
    });

    it('should disregard extra slashes:', function() {
      assert.strictEqual(template('<%= segments("a///b\\/c\\/e.js", 1, 3) %>', imports)(), 'b/c');
      assert.strictEqual(template('<%= path.segments("a///b\\/c\\/e.js", 1, 3) %>', imports)(), 'b/c');
      assert.strictEqual(template('<%= segments("a///b/\\//c/e.js", 1, 2) %>', imports)(), 'b');
      assert.strictEqual(template('<%= path.segments("a///b/\\//c/e.js", 1, 2) %>', imports)(), 'b');
    });
  });
});

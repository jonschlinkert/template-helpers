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

var imports = {imports: helpers};

describe('path helpers', function() {
  it('should join the given paths:', function() {
    _.template('<%= path.join("a", "b") %>', imports)().should.equal('a/b');
  });
  it('should return the dirname:', function() {
    _.template('<%= path.dirname("a/b/c/e.js") %>', imports)().should.equal('a/b/c');
  });
  it('should return the basename:', function() {
    _.template('<%= path.basename("a/b/c/e.js") %>', imports)().should.equal('e.js');
  });
  it('should return the filename:', function() {
    _.template('<%= path.filename("a/b/c/e.js") %>', imports)().should.equal('e');
  });
  it('should return the extname:', function() {
    _.template('<%= path.extname("a/b/c/e.js") %>', imports)().should.equal('.js');
  });
  it('should return the extname of the given path:', function() {
    _.template('<%= path.isAbsolute("/foo/bar") %>', imports)().should.equal('true');
    _.template('<%= path.isAbsolute("/baz/..") %>', imports)().should.equal('true');
    _.template('<%= path.isAbsolute("qux/") %>', imports)().should.equal('false');
    _.template('<%= path.isAbsolute(".") %>', imports)().should.equal('false');
    _.template('<%= path.isAbsolute("//server") %>', imports)().should.equal('true');
    _.template('<%= path.isAbsolute("bar\\baz") %>', imports)().should.equal('false');
    _.template('<%= path.isAbsolute(".") %>', imports)().should.equal('false');
  });

  it('should resolve the given paths:', function() {
    _.template('<%= path.extname("c/e.js") %>', imports)().should.equal('.js');
  });

  it('should return a relative file path:', function() {
    _.template('<%= path.relative("docs/", "docs/a/b.js") %>', imports)().should.equal('a/b.js');
    _.template('<%= path.relative("docs/a/b.js", "docs/") %>', imports)().should.equal('..');
  });
});

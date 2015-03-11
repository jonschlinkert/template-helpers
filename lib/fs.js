'use strict';

var fs = require('fs');
var path = require('path');
var concat_ = require('helper-concat');

/**
 * Read a file from the file system and inject its content
 *
 * ```js
 * <%= read("foo.js") %>
 * ```
 *
 * @param {String} `filepath` Path of the file to read.
 * @return {String} Contents of the given file.
 * @api public
 */

exports.read = function read(fp) {
  fp = path.resolve(fp);
  if (!fs.existsSync(fp)) return '';
  return fs.readFileSync(fp, 'utf8');
};

/**
 * Read a file from the file system and inject its content
 *
 * ```js
 * <%= concat("*.js") %>
 * ```
 *
 * @param {String|Array} `glob` Glob pattern(s) or file path(s).
 * @return {String} `glob` Concatenated contents of the globbed files.
 * @return {Object} `optons` Options to pass to [helper-concat].
 * @api public
 */

exports.concat = function concat(glob, opts) {
  return concat_.sync(glob, opts);
};

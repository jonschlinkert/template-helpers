'use strict';

var fs = require('fs');
var path = require('path');

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

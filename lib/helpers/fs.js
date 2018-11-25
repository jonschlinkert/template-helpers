'use strict';

const fs = require('fs');

/**
 * Return true if a file exists
 *
 * ```js
 * <%= exists("foo.js") %>
 * ```
 * @param {String} `filepath` Path of the file to check.
 * @return {Boolean} True if the file exists
 * @api public
 */

exports.exists = filepath => filepath && fs.existsSync(filepath);

/**
 * Read a file from the file system and inject its content
 *
 * ```js
 * <%= read("foo.js") %>
 * ```
 * @param {String} `filepath` Path of the file to read.
 * @return {String} Contents of the given file.
 * @api public
 */

exports.read = filepath => {
  if (!exports.exists(filepath)) return '';
  return fs.readFileSync(filepath, 'utf8');
};

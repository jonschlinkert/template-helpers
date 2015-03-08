'use strict';

var mm = require('micromatch');

/**
 * See [globby] for documentation.
 * @api public
 */

exports.glob = require('globby');

/**
 * Returns true if the given file path matches
 * the glob pattern or regular expression.
 *
 * @param  {String} `filepath`
 * @param  {String|RegExp} `pattern` Glob pattern or regex.
 * @return {String}
 * @api public
 */

exports.match = function match(fp, pattern, options) {
  return mm.match(fp, pattern, options);
};

/**
 * Returns true if the given file path matches
 * the glob pattern or regular expression.
 *
 * @param  {String} `filepath`
 * @param  {String|RegExp} `pattern` Glob pattern or regex.
 * @return {String}
 * @api public
 */

exports.isMatch = function isMatch(fp, pattern, options) {
  return mm.isMatch(fp, pattern, options);
};

/**
 * <%= apidocs(node_modules('helper-concat')) %>
 * @noname
 * @api public
 */

exports.concat = require('helper-concat');

'use strict';

const path = require('path');
const relative = require('relative');

/**
 * Return the dirname for the given `filepath`. Uses
 * the node.js [path] module.
 *
 * ```js
 * <%= dirname("a/b/c/d") %>
 * //=> 'a/b/c'
 * ```
 * @param {String} `filepath`
 * @return {String} Returns the directory part of the file path.
 * @api public
 */

exports.dirname = path.dirname;

/**
 * Return the basename for the given `filepath`. Uses
 * the node.js [path] module.
 *
 * ```js
 * <%= basename("a/b/c/d.js") %>
 * //=> 'd.js'
 * ```
 * @param {String} `filepath`
 * @return {String} Returns the basename part of the file path.
 * @api public
 */

exports.basename = path.basename;

/**
 * Returns the filename for the given `filepath`, excluding
 * extension. Aliased as `stem`.
 *
 * ```js
 * <%= filename("a/b/c/d.js") %>
 * //=> 'd'
 * ```
 * @param {String} `filepath`
 * @return {String} Returns the file name part of the file path.
 * @api public
 */

exports.filename = filepath => {
  return path.basename(filepath, path.extname(filepath));
};

/**
 * Alias for [filename](#filename).
 *
 * ```js
 * <%= stem("a/b/c/d.js") %>
 * //=> 'd'
 * ```
 * @param {String} `filepath`
 * @return {String} Returns the file name part of the file path.
 * @api public
 */

exports.stem = exports.filename;

/**
 * Return the file extension for the given `filepath`.
 * Uses the node.js [path] module.
 *
 * ```js
 * <%= extname("foo.js") %>
 * //=> '.js'
 * ```
 * @param {String} `filepath`
 * @return {String} Returns a file extension
 * @api public
 */

exports.extname = path.extname;

/**
 * Return the file extension for the given `filepath`,
 * excluding the `.`.
 *
 * ```js
 * <%= ext("foo.js") %>
 * //=> 'js'
 * ```
 * @param {String} `filepath`
 * @return {String} Returns a file extension without dot.
 * @api public
 */

exports.ext = filepath => path.extname(filepath).replace(/^\./, '');

/**
 * Resolves the given paths to an absolute path. Uses
 * the node.js [path] module.
 *
 * ```js
 * <%= resolve('/foo/bar', './baz') %>
 * //=> '/foo/bar/baz'
 * ```
 * @param {String} `filepath`
 * @return {String} Returns a resolve
 * @api public
 */

exports.resolve = path.resolve;

/**
 * Get the relative path from file `a` to file `b`.
 * Typically `a` and `b` would be variables passed
 * on the context. Uses the node.js [path] module.
 *
 * ```js
 * <%= relative(a, b) %>
 * ```
 * @param {String} `a` The "from" file path.
 * @param {String} `b` The "to" file path.
 * @return {String} Returns a relative path.
 * @api public
 */

exports.relative = (a, b) => {
  if (b === void 0) {
    b = a;

    if (typeof process !== 'undefined' && typeof process.cwd === 'function') {
      a = process.cwd();
    } else {
      a = '.';
    }
  }

  a = a || '';
  b = b || '';
  let rel = relative(a, b);
  return rel === '.' ? './' : rel;
};

/**
 * Get specific (joined) segments of a file path by passing a
 * range of array indices.
 *
 * ```js
 * <%= segments("a/b/c/d", "2", "3") %>
 * //=> 'c/d'
 *
 * <%= segments("a/b/c/d", "1", "3") %>
 * //=> 'b/c/d'
 *
 * <%= segments("a/b/c/d", "1", "2") %>
 * //=> 'b/c'
 * ```
 * @param {String} `filepath` The file path to split into segments.
 * @return {String} Returns a single, joined file path.
 * @api public
 */

exports.segments = (filepath, a, b) => {
  return filepath.split(/[\\/]+/).slice(a, b).join('/');
};

/**
 * Join all arguments together and normalize the resulting
 * `filepath`. Uses the node.js [path] module.
 *
 * **Note**: there is also a `join()` array helper, dot notation
 * can be used with helpers to differentiate. Example: `<%= path.join() %>`.
 *
 *
 * ```js
 * <%= join("a", "b") %>
 * //=> 'a/b'
 * ```
 * @param {String} `filepaths` List of file paths.
 * @return {String} Returns a single, joined file path.
 * @api public
 */

exports.join = path.join;

/**
 * Returns true if a file path is an absolute path. An
 * absolute path will always resolve to the same location,
 * regardless of the working directory. Uses the node.js
 * [path] module.
 *
 * ```js
 * // posix
 * <%= isAbsolute('/foo/bar') %>
 * //=> 'true'
 * <%= isAbsolute('qux/') %>
 * //=> 'false'
 * <%= isAbsolute('.') %>
 * //=> 'false'
 *
 * // Windows
 * <%= isAbsolute('//server') %>
 * //=> 'true'
 * <%= isAbsolute('C:/foo/..') %>
 * //=> 'true'
 * <%= isAbsolute('bar\\baz') %>
 * //=> 'false'
 * <%= isAbsolute('.') %>
 * //=> 'false'
 * ```
 * @param {String} `filepath`
 * @return {String} Returns a resolve
 * @api public
 */

exports.isAbsolute = path.isAbsolute;

/**
 * Returns true if a file path is an absolute path. An
 * absolute path will always resolve to the same location,
 * regardless of the working directory. Uses the node.js
 * [path] module.
 *
 * ```js
 * // posix
 * <%= isRelative('/foo/bar') %>
 * //=> 'false'
 * <%= isRelative('qux/') %>
 * //=> 'true'
 * <%= isRelative('.') %>
 * //=> 'true'
 *
 * // Windows
 * <%= isRelative('//server') %>
 * //=> 'false'
 * <%= isRelative('C:/foo/..') %>
 * //=> 'false'
 * <%= isRelative('bar\\baz') %>
 * //=> 'true'
 * <%= isRelative('.') %>
 * //=> 'true'
 * ```
 * @param {String} `filepath`
 * @return {String} Returns a resolve
 * @api public
 */

exports.isRelative = filepath => !path.isAbsolute(filepath);

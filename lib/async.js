'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
var async = require('async');
var extend = require('./object/extend');
var glob = require('./glob/glob');

/**
 * Async helper for concatenating a glob of files. Returns
 * a single string, with files separated by a newline.
 * A custom separator may be specific on `options.sep`.
 *
 * Note that this helper only works with apps that add support
 * for using async helpers, like [assemble], [verb] or [template].
 *
 * @param  {String|Array} `patterns`
 * @param  {Object} `options`
 * @param  {Function} `cb`
 * @return {String}
 * @api public
 * @async
 */

exports.globConcat = function globConcat(patterns, options, cb) {
  if (typeof options === 'function') {
    cb = options; options = {};
  }

  var opts = extend({sep: '\n'}, options);

  glob(patterns, options, function(err, files) {
    async.mapSeries(files, function(fp, next) {
      fs.readFile(fp, 'utf8', next);
    }, function (err, arr) {
      if (err) return cb(err);
      cb(null, arr.join(opts.sep));
    });
  });
};

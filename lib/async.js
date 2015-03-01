'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
var async = require('async');
var extend = require('./object/extend');
var glob = require('./glob/glob');

/**
 * Concatenate a glob of files, returning a single string separated
 * by a newline. Specify a custom separator on `options.sep`.
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

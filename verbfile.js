'use strict';

var gutil = require('gulp-util');
var istanbul = require('gulp-istanbul');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var verb = require('verb');

/* deps: jshint-stylish */
verb.task('lint', function () {
  verb.src(['index.js', 'lib/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

verb.task('test', ['lint'], function (cb) {
  verb.src(['index.js', 'lib/*.js'])
    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      verb.src(['test/*.js'])
        .pipe(mocha())
        .on('error', gutil.log)
        .pipe(istanbul.writeReports({
          reporters: [ 'text-summary' ],
          reportOpts: {dir: 'coverage', file: 'summary.txt'}
        }))
        .on('end', function () {
          cb();
        });
    });
});

verb.task('readme', function () {
  verb.src('.verb.md')
    .pipe(verb.dest('.'));
});

verb.task('default', ['readme', 'lint', 'test']);

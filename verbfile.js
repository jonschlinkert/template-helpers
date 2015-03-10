'use strict';

var fs = require('fs');
var path = require('path');
// var gutil = require('gulp-util');
// var istanbul = require('gulp-istanbul');
var exportFiles = require('export-files');
// var jshint = require('gulp-jshint');
// var mocha = require('gulp-mocha');
// var through = require('through2');
var strip = require('strip-ansi');
var code = require('code-context');
var mdu = require('markdown-utils');
var relative = require('relative');
var verb = require('verb');

// verb.option('debugEngine', true);
// verb.data({docsDiff: {}, testDiff: {}});

// verb.task('lint', function () {
//   return verb.src(['index.js', 'lib/*.js'])
//     .pipe(jshint('.jshintrc'))
//     .pipe(jshint.reporter('jshint-stylish'));
// });

// verb.task('test', ['lint'], function (cb) {
//   verb.src(['index.js', 'lib/*.js'])
//     .pipe(istanbul({includeUntested: true}))
//     .pipe(istanbul.hookRequire())
//     .on('finish', function () {
//       verb.src(['test/*.js'])
//         .pipe(mocha())
//         .on('error', gutil.log)
//         .pipe(istanbul.writeReports())
//         .on('end', function () {
//           cb();
//         })
//     });
// });

verb.task('readme', function() {
  // verb.partial('./coverage/*.txt', [coverage]);
  return verb.src('.verb.md').pipe(verb.dest('.'));
});


/**
 * Code coverage loader
 */

// function coverage(file) {
//   var tmpl = file['summary.txt'];
//   if (!tmpl) return '';

//   tmpl.content = strip(tmpl.content);
//   var lines = tmpl.content.split('\n');

//   var arr = lines.reduce(function (acc, line, i) {
//     if (i !== 0 && i !== lines.length - 2 && i !== lines.length - 4) {
//       acc.push('| ' + line);
//     }
//     return acc;
//   }, []);

//   // remove the last line of the table
//   arr.pop();
//   tmpl.content = arr.join('\n');
//   return file;
// }

// function foo(options) {
//   return through.obj(function (file, enc, cb) {
//     // console.log(file.contents.toString())
//     this.push(file);
//     cb();
//   });
// };

verb.helper('list', function (dir) {
  var res = exportFiles(dir).reduce(function (acc, fp) {
    acc[fp] = require(path.resolve(dir, fp));
    return acc;
  }, {});
  return generate(res);
});


/**
 * TODO: move this out into a plugin
 */

function context(str) {
  return code(str).reduce(function (acc, ele) {
    if (ele && ele.type !== 'comment') {
      acc[ele.name] = ele.begin;
    }
    return acc;
  }, {});
}

function generate(obj) {
  var keys = Object.keys(obj);
  var len = keys.length;
  var i = 0;
  var res = '\n';
  var count = len;

  while (len--) {
    var fp = keys[i++];
    var ctx = context(fs.readFileSync(fp, 'utf8'));
    var name = path.basename(fp, path.extname(fp));
    res += '\n+ ' + mdu.strong(mdu.link(name, relative(fp))) + '\n';

    var list = obj[fp];
    var items = Object.keys(list);

    // todo: move this to a new function
    res += listItems(ctx, items);
  }

  function listItems(ctx, items) {
    return items.map(function (method) {
      var line = ctx[method];
      var link = method;
      if (line) {
        link = mdu.link(method, relative(fp) + '#L' + line);
      }
      return '  - ' + link;
    }).sort().join('\n');
  }

  var result = count + ' helpers organized into the following categories:' + res;
  return result.replace(/^\s*|\s*$/g, '');
}


verb.task('default', ['readme']);

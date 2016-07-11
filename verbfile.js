'use strict';

var fs = require('fs');
var path = require('path');
var exists = require('fs-exists-sync');
var link = require('markdown-link');
var through = require('through2');
var cache = {};

/**
 * TODO: externalize to `verb-generate-toc`
 */

module.exports = function(verb, base, env) {
  verb.on('error', console.log);

  verb.use(require('verb-generate-readme'));
  verb.helpers(require('./')());
  helpers(verb);

  verb.preRender(/\.md$/, function(file, next) {
    file.options.stripEmpty = false;
    next();
  });

  verb.task('toc', function(cb) {
    var total = { categories: 0, helpers: 0 };
    var sections = [];
    var summary = [];
    var methods = {};
    var toc = [];

    return verb.src('lib/*.js')
      .pipe(through.obj(function(file, enc, next) {
        if (file.stem === 'index') {
          next();
          return;
        }

        try {
          file.base = verb.cwd;
          file.code = require(file.path);
          var heading = listItem(file);
          var newFile = {
            methods: require(file.path),
            test: {
              path: path.join('test', file.basename),
              code: {}
            },
            code: {},
            path: file.relative,
            base: file.base,
            cwd: file.cwd,
            relative: file.relative,
            stem: file.stem || path.basename(file.path, path.extname(filepath)),
            data: {
              methods: {}
            }
          };

          var testLine = matchTest(newFile.test.path);
          var codeLine = matchCode(newFile.path);

          for (var key in newFile.methods) {
            total.helpers++;
            if (newFile.methods.hasOwnProperty(key)) {
              newFile.data.methods[key] = {
                method: newFile.stem,
                stem: key,
                code: {
                  path: newFile.relative,
                  line: codeLine(key)
                },
                test: {
                  path: newFile.test.path,
                  line: testLine(key)
                }
              };
            }
          }

          methods[newFile.stem] = newFile;
          total.categories++;
          next();
        } catch (err) {
          next(err);
        }
      }, function(next) {

        verb.data({total: total});
        verb.data({methods: methods});
        next();
      }));
  });

  verb.task('sectionToc', function() {
    var toc = '';
    return verb.src('lib/*.js')
      .pipe(through.obj(function(file, enc, next) {
        if (file.stem !== 'index') {
          file.base = verb.cwd;
          toc += '- ' + link(file.stem, '#' + file.stem) + ' ';
          toc += '(code '+ link(file.stem, file.relative) + ')\n';
        }
        next();
      }, function(next) {
        // create an `include` from the toc
        verb.include('toc.md', {content: toc});
        next();
      }))
      .pipe(verb.dest('.'));
  });

  verb.task('fix-headings', function() {
    return verb.src('README.md')
      .pipe(through.obj(function(file, enc, next) {
        var str = file.contents.toString();
        str = str.replace(/\n### index/, '');
        str = str.replace(/^(#{2,}\s*\[)\./gm, '$1');
        file.contents = new Buffer(str);
        next(null, file);
      }))
      .pipe(verb.dest('.'));
  });

  verb.task('default', ['toc', 'readme', 'fix-headings']);
};


function section(name) {
  return `## ${name}\n{%= apidocs("lib/${name}.js") %}`;
}

function matchTest(fp) {
  if (!fp || !exists(fp)) return function() {};
  var str = fs.readFileSync(fp, 'utf8');
  var lines = str.split('\n');
  return function(method) {
    var re = new RegExp('\\s*(describe|it)\\([\'"]\\.?(' + method + ')');
    var len = lines.length, i = -1;
    while (++i < len) {
      var line = lines[i];
      if (re.test(line)) {
        return i + 1;
      }
    }
    return;
  };
}

function matchCode(fp) {
  if (!fp || !exists(fp)) return function() {};
  var str = fs.readFileSync(fp, 'utf8');
  var lines = str.split('\n');
  return function(method) {
    var re = new RegExp('^exports\\.(' + method + ')', 'gm');
    var len = lines.length, i = -1;
    while (++i < len) {
      var line = lines[i];
      if (re.test(line)) {
        return i + 1;
      }
    }
    return;
  };
}

function helpers(app) {
  app.helper('bullet', function(file) {
    return '- **' + link(file.stem, '#' + file.stem) + '**';
  });

  app.helper('issue', function(name) {
    var repo = app.cache.data.repository;
    return '[create issue](https://github.com/' + repo + '/issues/new?title=' + name + '%20helper)';
  });

  app.helper('sectionIssue', function(section) {
    var repo = app.cache.data.repository;
    var url = 'https://github.com/' + repo + '/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+';
    return '[issues](' + url + section + '+helpers)';
  });

  app.helper('anchor', function(file) {
    return link(file.stem, '#' + file.stem);
  });

  app.helper('codeLink', function(file) {
    return codeLink('code', file.code.path, file.code.line);
  });

  app.helper('testLink', function(file) {
    var line = file.test.line;
    return line ? codeLink('unit tests', file.test.path, line) : '[no tests]';
  });

  app.helper('link', function(name, filepath) {
    return link(name, filepath);
  });
}

function listItem(file) {
  return '- **' + link(file.stem, '#' + file.stem) + '** (code ' + link(file.stem, file.relative) + ')';
}

function codeLink(title, path, start) {
  return link(title, path + '#L' + start);
}

'use strict';

var link = require('markdown-link');
var through = require('through2');

module.exports = function(verb, base, env) {
  verb.extendWith('verb-readme-generator');

  verb.task('toc', function() {
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

  verb.task('docs', function() {
    return verb.src('README.md')
      .pipe(through.obj(function(file, enc, next) {
        file.content = file.content.replace(/^(#{2,}\s*\[)\./gm, '$1');
        next(null, file);
      }))
      .pipe(verb.dest('.'));
  });

  verb.task('default', function(cb) {
    verb.generate(['toc', 'readme', 'docs'], cb);
  });
};

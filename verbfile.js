'use strict';

var through = require('through2');

module.exports = function(verb, base, env) {
  verb.extendWith('verb-readme-generator');

  verb.task('toc', function() {
    var files = [];
    return verb.src('lib/*.js')
      .pipe(through.obj(function(file, enc, next) {
        if (file.stem !== 'index') {
          files.push(file);
        }
        next();
      }, function(next) {
        var str = '';
        files.forEach(function(file) {
          file.base = verb.cwd;
          str += '- [' + file.stem + '](#' + file.stem + ') '
          str += '(code [' + file.stem + '](' + file.relative + '))\n';
        });
        verb.include('toc.md', {content: str});
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

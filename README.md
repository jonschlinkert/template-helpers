# template-helpers [![NPM version](https://badge.fury.io/js/template-helpers.svg)](http://badge.fury.io/js/template-helpers)  [![Build Status](https://travis-ci.org/jonschlinkert/template-helpers.svg)](https://travis-ci.org/jonschlinkert/template-helpers) 

> Generic JavaScript helpers that can be used with any template engine. Handlebars, Lo-Dash, Underscore, or any engine that supports helper functions.

## Install with [npm](npmjs.org)

```bash
npm i template-helpers --save
```

## Usage

To get all helpers grouped by collection:

```js
var helpers = require('template-helpers');

// All helpers are on the `_` property
console.log(helpers._);
```

**Get a specific collection**

```js
var helpers = require('template-helpers');

// get only the math helpers
var math = helpers.math;
```

### Use with any template engine

**Lo-Dash Example**

```js
var context = {arr: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']};

// pass helpers on `imports`
var imports = {imports: helpers.arrays};
var template = _.template('<%= first(foo) %>', imports);

// pass context
template({foo: ['a', 'b', 'c']});
//=> 'a'
```

### Namespacing 

Handlebars and Lo-Dash both allow **dot notation** to be used for referencing helpers. Other engines may allow this too, I'd be happy to add this information to readme if someone wants to do a PR.

**Example**

```js
<%= path.dirname("a/b/c/d.js") %>
```

This can be used as a way of working around potential naming conflicts. 


## API
### [.first](./lib/arrays.js#L21)

Returns the first item, or first `n` items of an array.

* `array` **{Array}**    
* `n` **{Number}**: Number of items to return, starting at `0`.    
* `returns`: {Array}  

```js
<%= first(['a', 'b', 'c', 'd', 'e'], 2) %>
//=> ['a', 'b']
```

### [.last](./lib/arrays.js#L47)

Returns the last item, or last `n` items of an array.

* `array` **{Array}**    
* `n` **{Number}**: Number of items to return, starting with the last item.    
* `returns`: {Array}  

```js
<%= last(['a', 'b', 'c', 'd', 'e'], 2) %>
//=> ['d', 'e']
```

### [.before](./lib/arrays.js#L75)

Returns all of the items in an array up to the specified number Opposite of `{{after}}`.

* `array` **{Array}**    
* `n` **{Number}**    
* `returns` **{Array}**: Array excluding items after the given number.  

```js
<%= before(['a', 'b', 'c'], 2) %>
//=> ['a', 'b']
```

### [.after](./lib/arrays.js#L97)

Returns all of the items in an arry after the specified index.

* `array` **{Array}**: Collection    
* `n` **{Number}**: Starting index (number of items to exclude)    
* `returns` **{Array}**: Array exluding `n` items.  

```js
<%= after(['a', 'b', 'c'], 1) %>
//=> ['c']
```

### [.join](./lib/arrays.js#L122)

Join all elements of array into a string, optionally using a given separator.

* `array` **{Array}**    
* `sep` **{String}**: The separator to use.    
* `returns`: {String}  

```js
<%= join(['a', 'b', 'c']) %>
//=> 'a, b, c'

<%= join(['a', 'b', 'c'], '-') %>
//=> 'a-b-c'
```

### [.toArray](./lib/arrays.js#L195)

Converts a string such as "foo, bar, baz" to an ES Array of strings.

* `str` **{String}**    
* `returns`: {Array}  

```js
<%= toArray('a,b,c') %>
//=> ["a", "b", "c"]
```

### [.compact](./lib/arrays.js#L214)

Returns an array with all falsey values removed.

* `arr` **{Array}**    
* `returns`: {Array}  

```js
<%= compact([null, a, undefined, 0, false, b, c, '']) %>
//=> [a, b, c]
```

### [diff](https://github.com/jonschlinkert/arr-diff/blob/master/index.js#L38)

Return the difference between the first array and additional arrays.

* `a` **{Array}**    
* `b` **{Array}**    
* `returns`: {Array}  

```js
var diff = require('template-helpers');

var a = ['a', 'b', 'c', 'd'];
var b = ['b', 'c'];

console.log(diff(a, b))
//=> ['a', 'd']
```



### [.globConcat](./lib/async.js#L28)

Async helper for concatenating a glob of files. Returns a single string, with files separated by a newline. A custom separator may be specific on `options.sep`.

* `patterns` **{String|Array}**    
* `options` **{Object}**    
* `cb` **{Function}**    
* `returns`: {String}  

Note that this helper only works with apps that add support
for using async helpers, like [assemble], [verb] or [template].


### [.embed](./lib/code.js#L26)

Embed code from an external file as preformatted text.

* `fp` **{String}**: filepath to the file to embed.    
* `language` **{String}**: Optionally specify the language to use for syntax highlighting.    
* `returns`: {String}  

```js
<%= embed('path/to/file.js') %>

// specify the language to use
<%= embed('path/to/file.hbs', 'html') %>
```

### [.jsfiddle](./lib/code.js#L53)

Embed a jsFiddle with the given `params`

* `params` **{Object}**    
* `returns`: {String}  

```js
<%= jsfiddle({id: '0dfk10ks', {tabs: true}}) %>
```

### [.gist](./lib/code.js#L82)

Embed a GitHub Gist with the given `id`.

* `id` **{String}**: The id of the gist to embed.    
* `returns`: {String}  

```js
<%=  gist("5854601") %>
```

### [.any](./lib/collections.js#L15)

* `value` **{*}**    
* `target` **{*}**    
* `options` **{Object}**    

Returns `true` if `value` exists in the given string, array
or object. See [any] for documentation.


### [.glob](./lib/glob.js#L10)


See [globby] for documentation.

### [.isMatch](./lib/glob.js#L22)

* `filepath` **{String}**    
* `pattern` **{String|RegExp}**: Glob pattern or regex.    
* `returns`: {String}  

Returns true if the given file path matches
the glob pattern or regular expression.


### [.add](./lib/math.js#L19)

Return the product of `a` plus `b`.

* `a` **{Number}**    
* `b` **{Number}**    

```js
<%= add(1, 2) %>
//=> '3'
```

### [.subtract](./lib/math.js#L36)

Subtract `b` from `a`.

* `a` **{Number}**    
* `b` **{Number}**    

```js
<%= subtract(5, 2) %>
//=> '3'
```

### [.divide](./lib/math.js#L54)

Divide `a` (the numerator) by `b` (the divisor).

* `a` **{Number}**: the numerator.    
* `b` **{Number}**: the divisor.    
* `returns` **{Number}**: The quotient of `a` divided by `b`.  

```js
<%= divide(10, 2) %>
//=> '5'
```

### [.multiply](./lib/math.js#L72)

Multiply `a` by `b`.

* `a` **{Number}**    
* `b` **{Number}**    
* `returns` **{Number}**: The product of `a` times `b`.  

```js
<%= divide(10, 2) %>
//=> '5'
```

### [.floor](./lib/math.js#L90)

Returns the largest integer less than or equal to the given `number`.

* `number` **{Number}**    
* `returns`: {Number}  

```js
<%= floor(10.6) %>
//=> '10'
```

### [.ceil](./lib/math.js#L108)

Returns the smallest integer greater than or equal to the given `number`.

* `number` **{Number}**    
* `returns`: {Number}  

```js
<%= ceil(10.1) %>
//=> '11'
```

### [.round](./lib/math.js#L129)

Returns the value of the given `number` rounded to the nearest integer.

* `number` **{Number}**    
* `returns`: {Number}  

```js
<%= round(10.1) %>
//=> '10'

<%= round(10.5) %>
//=> '11'
```

### [.sum](./lib/math.js#L149)

Returns the sum of all numbers in the given array.

* `number` **{Number}**    
* `returns`: {Number}  

```js
<%= round(10.1) %>
//=> '10'

<%= round(10.5) %>
//=> '11'
```

### [.stringify](./lib/objects.js#L33)

* `object` **{Object}**    
* `returns`: {String}  

Stringify an object using `JSON.stringify()`.

### [.hasOwn](./lib/objects.js#L46)

* `object` **{Object}**    
* `key` **{String}**    
* `returns`: {Boolean}  

Returns true if `object` has own property `key`.

### [.get](./lib/objects.js#L58)

* `object` **{Object}**    
* `returns`: {String}  

Stringify an object using `JSON.stringify()`.

### [.keys](./lib/objects.js#L70)

* `obj` **{Object}**    
* `returns` **{Array}**: Keys from `obj`  

Returns the keys on the give `object`.

### [.isObject](./lib/objects.js#L90)

Return true if the given `value` is an object with keys.

* `value` **{Object}**: The value to check.    
* `returns`: {Boolean}  

```js
<%= isObject(['a', 'b', 'c']) %>
//=> 'false'

<%= isObject({a: 'b'}) %>
//=> 'true'
```

### [.forIn](./lib/objects.js#L107)

* `object` **{Object}**: The object to iterate over.    
* `fn` **{Function}**: Callback function.    
* `thisArg` **{Object}**: Context in which to execute the callback.    
* `returns`: {Object}  

Iterate over the own and inherited enumerable properties
of an object, and return an object with properties that
evaluate to true from the callback. Exit early by returning
`false`.

### [.forOwn](./lib/objects.js#L127)

* `object` **{Object}**: The object to iterate over.    
* `fn` **{Function}**: Callback function.    
* `thisArg` **{Object}**: Context in which to execute the callback.    
* `returns`: {Object}  

Iterate over the own enumerable properties of an object, and
return an object with properties that evaluate to true from
the callback. Exit early by returning `false`

### [.extend](./lib/objects.js#L144)

* `o` **{Object}**: The target object. Pass an empty object to shallow clone.    
* `objects` **{Object}**    
* `returns`: {Object}  

Extend `o` with properties of other `objects`.

### [.merge](./lib/objects.js#L173)

* `o` **{Object}**: The target object. Pass an empty object to shallow clone.    
* `objects` **{Object}**    
* `returns`: {Object}  

Recursively combine the properties of `o` with the
properties of other `objects`.
### [.dirname](./lib/path.js#L20)

Return the dirname for the given `filepath`. Uses the node.js [path] module.

* `filepath` **{String}**    
* `returns` **{String}**: Returns the directory part of the file path.  

```js
<%= dirname("a/b/c/d") %>
//=> 'a/b/c'
```

### [.basename](./lib/path.js#L38)

Return the basename for the given `filepath`. Uses the node.js [path] module.

* `filepath` **{String}**    
* `returns` **{String}**: Returns the basename part of the file path.  

```js
<%= basename("a/b/c/d.js") %>
//=> 'd.js'
```

### [.filename](./lib/path.js#L56)

Return the filename for the given `filepath`, excluding extension.

* `filepath` **{String}**    
* `returns` **{String}**: Returns the file name part of the file path.  

```js
<%= basename("a/b/c/d.js") %>
//=> 'd'
```

### [.extname](./lib/path.js#L74)

Return the file extension for the given `filepath`. Uses the node.js [path] module.

* `filepath` **{String}**    
* `returns` **{String}**: Returns a file extension  

```js
<%= extname("foo.js") %>
//=> '.js'
```

### [.resolve](./lib/path.js#L92)

Resolves the given paths to an absolute path. Uses the node.js [path] module.

* `filepath` **{String}**    
* `returns` **{String}**: Returns a resolve  

```js
<%= resolve('/foo/bar', './baz') %>
//=> '/foo/bar/baz'
```

### [.relative](./lib/path.js#L111)

Get the relative path from file `a` to file `b`. Typically `a` and `b` would be variables passed on the context. Uses the node.js [path] module.

* `a` **{String}**: The "from" file path.    
* `b` **{String}**: The "to" file path.    
* `returns` **{String}**: Returns a relative path.  

```js
<%= relative(a, b) %>
```

### [.join](./lib/path.js#L133)

Join all arguments together and normalize the resulting `filepath`. Uses the node.js [path] module.

* `filepaths` **{String}**: List of file paths.    
* `returns` **{String}**: Returns a single, joined file path.  

**Note**: there is also a `join()` array helper, dot notation
can be used with helpers to differentiate. Example: `<%= path.join() %>`.

```js
<%= join("a", "b") %>
//=> 'a/b'
```

### [.isAbsolute](./lib/path.js#L170)

Determines whether path is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory. Uses the node.js [path] module.

* `filepath` **{String}**    
* `returns` **{String}**: Returns a resolve  

```js
// posix
<%= isAbsolute('/foo/bar') %>
//=> true
<%= isAbsolute('/baz/..') %>
//=> true
<%= isAbsolute('qux/') %>
//=> false
<%= isAbsolute('.') %>
//=> false

// Windows
<%= isAbsolute('//server') %>
//=> true
<%= isAbsolute('C:/foo/..') %>
//=> true
<%= isAbsolute('bar\\baz') %>
//=> false
<%= isAbsolute('.') %>
//=> false
```


## Run tests
Install dev dependencies.

```bash
npm i -d && npm test
```


## Related
* [handlebars-helpers](https://github.com/assemble/handlebars-helpers): 120+ Handlebars helpers in ~20 categories, for Assemble, YUI, Ghost or any Handlebars project. Includes helpers like {{i18}}, {{markdown}}, {{relative}}, {{extend}}, {{moment}}, and so on.

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/template-helpers/issues)


## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2015 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on March 07, 2015._

[ansi]: https://github.com/TooTallNate/ansi.js
[ansi-regex]: null
[ansi-styles]: https://github.com/sindresorhus/ansi-styles
[any]: https://github.com/jonschlinkert/any
[argparse]: https://github.com/nodeca/argparse
[arr-diff]: https://github.com/jonschlinkert/arr-diff
[arr-filter]: null
[arr-flatten]: https://github.com/jonschlinkert/arr-flatten
[arr-map]: null
[array-differ]: https://github.com/sindresorhus/array-differ
[array-slice]: null
[array-union]: https://github.com/sindresorhus/array-union
[array-uniq]: https://github.com/sindresorhus/array-uniq
[array-unique]: https://github.com/jonschlinkert/array-unique
[async]: https://github.com/caolan/async
[balanced-match]: https://github.com/juliangruber/balanced-match
[benchmark]: http://benchmarkjs.com/
[benchmarked]: https://github.com/jonschlinkert/benchmarked
[brace-expansion]: https://github.com/juliangruber/brace-expansion
[braces]: https://github.com/jonschlinkert/braces
[chalk]: null
[concat-map]: https://github.com/substack/node-concat-map
[debug]: https://github.com/visionmedia/debug
[delete]: https://github.com/jonschlinkert/delete
[escape-string-regexp]: https://github.com/sindresorhus/escape-string-regexp
[esprima]: http://esprima.org
[expand-brackets]: https://github.com/jonschlinkert/expand-brackets
[expand-range]: https://github.com/jonschlinkert/expand-range
[export-files]: https://github.com/jonschlinkert/export-files
[extend-shallow]: null
[extglob]: https://github.com/jonschlinkert/extglob
[file-reader]: https://github.com/jonschlinkert/file-reader
[filename-regex]: https://github.com/regexps/filename-regex
[fill-range]: https://github.com/jonschlinkert/fill-range
[for-in]: null
[for-own]: null
[fs-utils]: https://github.com/assemble/fs-utils
[get-value]: https://github.com/jonschlinkert/get-value
[glob]: null
[glob-base]: https://github.com/jonschlinkert/glob-base
[glob-parent]: https://github.com/es128/glob-parent
[glob-path-regex]: https://github.com/regexps/glob-path-regex
[globby]: null
[graceful-fs]: https://github.com/isaacs/node-graceful-fs
[has-ansi]: https://github.com/sindresorhus/has-ansi
[has-value]: https://github.com/jonschlinkert/has-value
[helper-concat]: https://github.com/jonschlinkert/helper-concat
[inflight]: https://github.com/isaacs/inflight
[inherits]: https://github.com/isaacs/inherits
[is-absolute]: https://github.com/jonschlinkert/is-absolute
[is-glob]: https://github.com/jonschlinkert/is-glob
[is-number]: https://github.com/jonschlinkert/is-number
[is-path-cwd]: https://github.com/sindresorhus/is-path-cwd
[is-path-in-cwd]: https://github.com/sindresorhus/is-path-in-cwd
[is-path-inside]: https://github.com/sindresorhus/is-path-inside
[is-relative]: https://github.com/jonschlinkert/is-relative
[isobject]: https://github.com/jonschlinkert/isobject
[js-yaml]: https://github.com/nodeca/js-yaml
[kind-of]: null
[lang-map]: https://github.com/jonschlinkert/lang-map
[language-map]: https://github.com/blakeembrey/language-map
[lodash]: null
[make-iterator]: https://github.com/jonschlinkert/make-iterator
[map-files]: https://github.com/jonschlinkert/map-files
[markdown-utils]: https://github.com/jonschlinkert/markdown-utils
[micromatch]: null
[minimatch]: https://github.com/isaacs/minimatch
[mixin-object]: https://github.com/jonschlinkert/mixin-object
[ms]: https://github.com/guille/ms.js
[noncharacters]: https://github.com/jonschlinkert/noncharacters
[normalize-path]: https://github.com/jonschlinkert/normalize-path
[object-omit]: https://github.com/jonschlinkert/object-omit
[object\.omit]: https://github.com/jonschlinkert/object.omit
[once]: null
[parse-glob]: https://github.com/jonschlinkert/parse-glob
[path-is-inside]: https://github.com/domenic/path-is-inside
[preserve]: https://github.com/jonschlinkert/preserve
[randomatic]: https://github.com/jonschlinkert/randomatic
[regex-cache]: https://github.com/jonschlinkert/regex-cache
[relative]: null
[repeat-element]: https://github.com/jonschlinkert/repeat-element
[repeat-string]: https://github.com/jonschlinkert/repeat-string
[rimraf]: https://github.com/isaacs/rimraf
[sprintf-js]: https://github.com/alexei/sprintf.js
[strip-ansi]: https://github.com/sindresorhus/strip-ansi
[supports-color]: https://github.com/sindresorhus/supports-color
[to-key]: https://github.com/jonschlinkert/to-key
[wrappy]: null



[assemble]: https://github.com/assemble/assemble
[verb]: https://github.com/assemble/verb
[template]: https://github.com/jonschlinkert/template
[path]: https://nodejs.org/api/path.html

<!-- deps:helper-reflinks -->

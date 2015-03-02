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

### [.any](./lib/collections.js#L17)

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

<%= apidocs(node_modules('helper-concat')) %>

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

### [.stringify](./lib/objects.js#L15)

* `object` **{Object}**    
* `returns`: {String}  

Stringify an object using `JSON.stringify()`.

### [.hasOwn](./lib/objects.js#L28)

* `object` **{Object}**    
* `key` **{String}**    
* `returns`: {Boolean}  

Returns true if `object` has own property `key`.

### [.get](./lib/objects.js#L40)

* `object` **{Object}**    
* `returns`: {String}  

Stringify an object using `JSON.stringify()`.

### [.keys](./lib/objects.js#L52)

* `obj` **{Object}**    
* `returns` **{Array}**: Keys from `obj`  

Returns the keys on the give `object`.

### [.isObject](./lib/objects.js#L72)

Return true if the given `value` is an object with keys.

* `value` **{Object}**: The value to check.    
* `returns`: {Boolean}  

```js
<%= isObject(['a', 'b', 'c']) %>
//=> 'false'

<%= isObject({a: 'b'}) %>
//=> 'true'
```

### [.forIn](./lib/objects.js#L89)

* `object` **{Object}**: The object to iterate over.    
* `fn` **{Function}**: Callback function.    
* `thisArg` **{Object}**: Context in which to execute the callback.    
* `returns`: {Object}  

Iterate over the own and inherited enumerable properties
of an object, and return an object with properties that
evaluate to true from the callback. Exit early by returning
`false`.

### [.forOwn](./lib/objects.js#L109)

* `object` **{Object}**: The object to iterate over.    
* `fn` **{Function}**: Callback function.    
* `thisArg` **{Object}**: Context in which to execute the callback.    
* `returns`: {Object}  

Iterate over the own enumerable properties of an object, and
return an object with properties that evaluate to true from
the callback. Exit early by returning `false`

### [.extend](./lib/objects.js#L126)

* `o` **{Object}**: The target object. Pass an empty object to shallow clone.    
* `objects` **{Object}**    
* `returns`: {Object}  

Extend `o` with properties of other `objects`.

### [.merge](./lib/objects.js#L155)

* `o` **{Object}**: The target object. Pass an empty object to shallow clone.    
* `objects` **{Object}**    
* `returns`: {Object}  

Recursively combine the properties of `o` with the
properties of other `objects`.


## Run tests

Install dev dependencies:

```bash
npm i -d && npm test
```

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

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on March 01, 2015._

[ansi]: https://github.com/TooTallNate/ansi.js
[ansi-regex]: null
[ansi-styles]: https://github.com/sindresorhus/ansi-styles
[any]: https://github.com/jonschlinkert/any
[argparse]: https://github.com/nodeca/argparse
[arr-diff]: null
[arr-filter]: null
[arr-flatten]: https://github.com/jonschlinkert/arr-flatten
[arr-map]: null
[array-differ]: https://github.com/sindresorhus/array-differ
[array-slice]: null
[array-union]: https://github.com/sindresorhus/array-union
[array-uniq]: https://github.com/sindresorhus/array-uniq
[array-unique]: https://github.com/jonschlinkert/array-unique
[async]: null
[balanced-match]: https://github.com/juliangruber/balanced-match
[benchmark]: http://benchmarkjs.com/
[benchmarked]: https://github.com/jonschlinkert/benchmarked
[brace-expansion]: https://github.com/juliangruber/brace-expansion
[braces]: https://github.com/jonschlinkert/braces
[chalk]: null
[clone-deep]: https://github.com/jonschlinkert/clone-deep
[concat-map]: https://github.com/substack/node-concat-map
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
[glob]: https://github.com/isaacs/node-glob
[glob-path-regex]: https://github.com/regexps/glob-path-regex
[globby]: null
[graceful-fs]: https://github.com/isaacs/node-graceful-fs
[has-ansi]: https://github.com/sindresorhus/has-ansi
[has-value]: https://github.com/jonschlinkert/has-value
[helper-concat]: https://github.com/jonschlinkert/helper-concat
[inflight]: https://github.com/isaacs/inflight
[inherits]: https://github.com/isaacs/inherits
[is-absolute]: https://github.com/jonschlinkert/is-absolute
[is-glob]: null
[is-number]: https://github.com/jonschlinkert/is-number
[is-path-cwd]: https://github.com/sindresorhus/is-path-cwd
[is-path-in-cwd]: https://github.com/sindresorhus/is-path-in-cwd
[is-path-inside]: https://github.com/sindresorhus/is-path-inside
[is-plain-object]: https://github.com/jonschlinkert/is-plain-object
[is-relative]: https://github.com/jonschlinkert/is-relative
[isobject]: null
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
[mixin-object]: null
[noncharacters]: https://github.com/jonschlinkert/noncharacters
[normalize-path]: https://github.com/jonschlinkert/normalize-path
[object-omit]: https://github.com/jonschlinkert/object-omit
[once]: null
[parse-glob]: https://github.com/jonschlinkert/parse-glob
[path-is-inside]: https://github.com/domenic/path-is-inside
[preserve]: https://github.com/jonschlinkert/preserve
[randomatic]: https://github.com/jonschlinkert/randomatic
[regex-cache]: https://github.com/jonschlinkert/regex-cache
[relative]: null
[repeat-element]: null
[repeat-string]: null
[rimraf]: https://github.com/isaacs/rimraf
[sprintf-js]: https://github.com/alexei/sprintf.js
[strip-ansi]: https://github.com/sindresorhus/strip-ansi
[supports-color]: https://github.com/sindresorhus/supports-color
[wrappy]: null



[assemble]: https://github.com/assemble/assemble
[verb]: https://github.com/assemble/verb
[template]: https://github.com/jonschlinkert/template

<!-- deps:helper-reflinks -->

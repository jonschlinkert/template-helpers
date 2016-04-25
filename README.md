# template-helpers [![NPM version](https://img.shields.io/npm/v/template-helpers.svg?style=flat)](https://www.npmjs.com/package/template-helpers) [![NPM downloads](https://img.shields.io/npm/dm/template-helpers.svg?style=flat)](https://npmjs.org/package/template-helpers) [![Build Status](https://img.shields.io/travis/jonschlinkert/template-helpers.svg?style=flat)](https://travis-ci.org/jonschlinkert/template-helpers)

Generic JavaScript helpers that can be used with any template engine. Handlebars, Lo-Dash, Underscore, or any engine that supports helper functions.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install template-helpers --save
```

In addition to the [related projects](#related-projects) listed below, also take a look at the [helpers org](https://github.com/helpers), there are 60+ specialized helpers that can be used individually.

## Usage

To get all helpers:

```js
var helpers = require('template-helpers')();
console.log(helpers);
```

**Get a specific helper category**

```js
// get only the math helpers
var helpers = require('template-helpers')('math');
```

**Get multiple helper categories**

```js
// get only the math helpers
var helpers = require('template-helpers')(['math', 'string']);
```

### Use with any template engine

**Lo-Dash Example**

```js
var helpers = require('template-helpers')('array');

// pass helpers on `imports`
var imports = {imports: helpers};

// compile a template
var fn = _.template('<%= first(foo) %>', imports);

// render
fn({foo: ['a', 'b', 'c']});
//=> 'a'
```

### Namespacing

Handlebars and Lo-Dash both allow **dot notation** to be used for referencing helpers. I'd be happy to add examples for other engines if someone wants to do a PR.

**Example**

```js
<%= path.dirname("a/b/c/d.js") %>
```

This can be used as a way of working around potential naming conflicts.

# API

**Categories**

* [array](#array) (code [array](lib/array.js))
* [code](#code) (code [code](lib/code.js))
* [collection](#collection) (code [collection](lib/collection.js))
* [conditional](#conditional) (code [conditional](lib/conditional.js))
* [fs](#fs) (code [fs](lib/fs.js))
* [html](#html) (code [html](lib/html.js))
* [math](#math) (code [math](lib/math.js))
* [object](#object) (code [object](lib/object.js))
* [path](#path) (code [path](lib/path.js))
* [string](#string) (code [string](lib/string.js))

## array

### [isArray](lib/array.js#L22)

Returns true if `value` is an array.

**Params**

* `value` **{any}**: The value to test.
* `returns` **{Boolean}**

**Example**

```js
<%= isArray('a, b, c') %>
//=> 'false'

<%= isArray(['a, b, c']) %>
//=> 'true'
```

### [arrayify](lib/array.js#L46)

Cast `val` to an array.

**Params**

* `val` **{any}**: The value to arrayify.
* `returns` **{Array}**: An array.
* `returns` **{Array}**

**Example**

```js
<%= arrayify('a') %>
//=> '["a"]'

<%= arrayify({a: 'b'}) %>
//=> '[{a: "b"}]'

<%= arrayify(['a']) %>
//=> '["a"]'
```

### [first](lib/array.js#L64)

Returns the first item, or first `n` items of an array.

**Params**

* `array` **{Array}**
* `n` **{Number}**: Number of items to return, starting at `0`.
* `returns` **{Array}**

**Example**

```js
<%= first(['a', 'b', 'c', 'd', 'e'], 2) %>
//=> '["a", "b"]'
```

### [last](lib/array.js#L87)

Returns the last item, or last `n` items of an array.

**Params**

* `array` **{Array}**
* `n` **{Number}**: Number of items to return, starting with the last item.
* `returns` **{Array}**

**Example**

```js
<%= last(['a', 'b', 'c', 'd', 'e'], 2) %>
//=> '["d", "e"]'
```

### [before](lib/array.js#L112)

Returns all of the items in an array up to the specified number Opposite of `<%= after() %`.

**Params**

* `array` **{Array}**
* `n` **{Number}**
* `returns` **{Array}**: Array excluding items after the given number.

**Example**

```js
<%= before(['a', 'b', 'c'], 2) %>
//=> '["a", "b"]'
```

### [after](lib/array.js#L132)

Returns all of the items in an arry after the specified index. Opposite of `<%= before() %`.

**Params**

* `array` **{Array}**: Collection
* `n` **{Number}**: Starting index (number of items to exclude)
* `returns` **{Array}**: Array exluding `n` items.

**Example**

```js
<%= after(['a', 'b', 'c'], 1) %>
//=> '["c"]'
```

### [each](lib/array.js#L159)

Calling `fn` on each element of the given `array` with the given `context`.

Assuming that `double` has been registered as a helper:

**Params**

* `array` **{Array}**
* `fn` **{String}**: The function to call on each element in the given array.
* `returns` **{String}**

**Examples**

```js
function double(str) {
  return str + str;
}
```

```js
<%= each(['a', 'b', 'c'], double, ctx) %>
//=> '["aa", "bb", "cc"]'
```

### [map](lib/array.js#L202)

Returns a new array, created by calling `function` on each element of the given `array`.

Assuming that `double` has been registered as a helper:

**Params**

* `array` **{Array}**
* `fn` **{String}**: The function to call on each element in the given array.
* `returns` **{String}**

**Examples**

```js
function double(str) {
  return str + str;
}
```

```js
<%= map(['a', 'b', 'c'], double) %>
//=> '["aa", "bb", "cc"]'
```

### [join](lib/array.js#L233)

Join all elements of array into a string, optionally using a given separator.

**Params**

* `array` **{Array}**
* `sep` **{String}**: The separator to use.
* `returns` **{String}**

**Example**

```js
<%= join(['a', 'b', 'c']) %>
//=> 'a, b, c'

<%= join(['a', 'b', 'c'], '-') %>
//=> 'a-b-c'
```

### [sort](lib/array.js#L258)

Sort the given `array`. If an array of objects is passed, you may optionally pass a `key` to sort on as the second argument. You may alternatively pass a sorting function as the second argument.

**Params**

* `array` **{Array}**: the array to sort.
* `key` **{String|Function}**: The object key to sort by, or sorting function.

**Example**

```js
<%= sort(["b", "a", "c"]) %>
//=> 'a,b,c'

<%= sort([{a: "zzz"}, {a: "aaa"}], "a") %>
//=> '[{"a":"aaa"},{"a":"zzz"}]'
```

### [length](lib/array.js#L292)

Returns the length of the given array.

**Params**

* `array` **{Array}**
* `returns` **{Number}**: The length of the array.

**Example**

```js
<%= length(['a', 'b', 'c']) %>
//=> 3
```

### [compact](lib/array.js#L310)

Returns an array with all falsey values removed.

**Params**

* `arr` **{Array}**
* `returns` **{Array}**

**Example**

```js
<%= compact([null, a, undefined, 0, false, b, c, '']) %>
//=> '["a", "b", "c"]'
```

### [difference](lib/array.js#L329)

Return the difference between the first array and additional arrays.

**Params**

* `array` **{Array}**: The array to compare againts.
* `arrays` **{Array}**: One or more additional arrays.
* `returns` **{Array}**

**Example**

```js
<%= difference(["a", "c"], ["a", "b"]) %>
//=> '["c"]'
```

### [unique](lib/array.js#L365)

Return an array, free of duplicate values.

**Params**

* `array` **{Array}**: The array to uniquify
* `returns` **{Array}**: Duplicate-free array

**Example**

```js
<%= unique(['a', 'b', 'c', 'c']) %
=> '["a", "b", "c"]'
```

### [union](lib/array.js#L395)

Returns an array of unique values using strict equality for comparisons.

**Params**

* `arr` **{Array}**
* `returns` **{Array}**

**Example**

```js
<%= union(["a"], ["b"], ["c"]) %>
//=> '["a", "b", "c"]'
```

### [shuffle](lib/array.js#L412)

Shuffle the items in an array.

**Params**

* `arr` **{Array}**
* `returns` **{Array}**

**Example**

```js
<%= shuffle(["a", "b", "c"]) %>
//=> ["c", "a", "b"]
```

## code

### [embed](lib/code.js#L24)

Embed code from an external file as preformatted text.

**Params**

* `fp` **{String}**: filepath to the file to embed.
* `language` **{String}**: Optionally specify the language to use for syntax highlighting.
* `returns` **{String}**

**Example**

```js
<%= embed('path/to/file.js') %>

// specify the language to use
<%= embed('path/to/file.hbs', 'html') %>
```

### [jsfiddle](lib/code.js#L48)

Generate the HTML for a jsFiddle link with the given `params`

**Params**

* `params` **{Object}**
* `returns` **{String}**

**Example**

```js
<%= jsfiddle({id: '0dfk10ks', {tabs: true}}) %>
```

## collection

### [any](lib/collection.js#L15)

Returns `true` if `value` exists in the given string, array
or object. See [any] for documentation.

**Params**

* `value` **{any}**
* `target` **{any}**
* `options` **{Object}**

## conditional

### [_if](lib/conditional.js#L13)

Return true if `key` is an own, enumerable property
of the given `obj`.

**Params**

* `object` **{Object}**
* `key` **{String}**
* `returns` **{Boolean}**

## fs

### [exists](lib/fs.js#L19)

Return true if a file exists

**Params**

* `filepath` **{String}**: Path of the file to check.
* `returns` **{Boolean}**: True if the file exists

**Example**

```js
<%= exists("foo.js") %>
```

### [read](lib/fs.js#L35)

Read a file from the file system and inject its content

**Params**

* `filepath` **{String}**: Path of the file to read.
* `returns` **{String}**: Contents of the given file.

**Example**

```js
<%= read("foo.js") %>
```

## html

### [escapeHtml](lib/html.js#L18)

Escape HTML characters in a string.

**Params**

* `str` **{String}**: String of HTML with characters to escape.
* `returns` **{String}**

**Example**

```js
<%= escapeHtml("<span>foo</span>") %>
//=> &lt;span&gt;foo&lt;&#x2F;span&gt;
```

### [sanitize](lib/html.js#L46)

Strip HTML tags from a string, so that only the text nodes are preserved.

**Params**

* `str` **{String}**: The string of HTML to sanitize.
* `returns` **{String}**

**Example**

```js
<%= sanitize("<span>foo</span>") %>
//=> 'foo'
```

## math

### [add](lib/math.js#L18)

Return the product of `a` plus `b`.

**Params**

* `a` **{Number}**
* `b` **{Number}**

**Example**

```js
<%= add(1, 2) %>
//=> '3'
```

### [subtract](lib/math.js#L35)

Subtract `b` from `a`.

**Params**

* `a` **{Number}**
* `b` **{Number}**

**Example**

```js
<%= subtract(5, 2) %>
//=> '3'
```

### [divide](lib/math.js#L53)

Divide `a` (the numerator) by `b` (the divisor).

**Params**

* `a` **{Number}**: the numerator.
* `b` **{Number}**: the divisor.
* `returns` **{Number}**: The quotient of `a` divided by `b`.

**Example**

```js
<%= divide(10, 2) %>
//=> '5'
```

### [multiply](lib/math.js#L71)

Multiply `a` by `b`.

**Params**

* `a` **{Number}**
* `b` **{Number}**
* `returns` **{Number}**: The product of `a` times `b`.

**Example**

```js
<%= divide(10, 2) %>
//=> '5'
```

### [floor](lib/math.js#L89)

Returns the largest integer less than or equal to the given `number`.

**Params**

* `number` **{Number}**
* `returns` **{Number}**

**Example**

```js
<%= floor(10.6) %>
//=> '10'
```

### [ceil](lib/math.js#L107)

Returns the smallest integer greater than or equal to the given `number`.

**Params**

* `number` **{Number}**
* `returns` **{Number}**

**Example**

```js
<%= ceil(10.1) %>
//=> '11'
```

### [round](lib/math.js#L128)

Returns the value of the given `number` rounded to the nearest integer.

**Params**

* `number` **{Number}**
* `returns` **{Number}**

**Example**

```js
<%= round(10.1) %>
//=> '10'

<%= round(10.5) %>
//=> '11'
```

### [sum](lib/math.js#L145)

Returns the sum of all numbers in the given array.

**Params**

* `number` **{Number}**
* `returns` **{Number}**

**Example**

```js
<%= sum([1, 2, 3, 4, 5]) %>
//=> '15'
```

## object

### [fallback](lib/object.js#L22)

Specify a fallback value to use when the desired value is undefined. Note that undefined variables that are _not object properties_ with throw an error.

**Params**

* `a` **{any}**: The desired value.
* `b` **{any}**: The fallback ("default") value
* `returns` **{any}**: Either `a` or `b`

**Example**

```js
// when `title` is undefined, use the generic `site.title`
<%= fallback(page.title, site.title) %>
```

### [stringify](lib/object.js#L39)

Stringify an object using `JSON.stringify()`.

**Params**

* `object` **{Object}**
* `returns` **{String}**

**Example**

```js
<%= stringify({a: "a"}) %>
//=> '{"a":"a"}'
```

### [parse](lib/object.js#L56)

Parse a string into an object using `JSON.parse()`.

**Params**

* `str` **{String}**: The string to parse.
* `returns` **{Object}**: The parsed object.

**Example**

```js
<%= parse('{"foo":"bar"}')["foo"] %>
//=> 'bar'
```

### [get](lib/object.js#L74)

Use property paths (`a.b.c`) get a nested value from an object.

**Params**

* `object` **{Object}**
* `path` **{String}**: Dot notation for the property to get.
* `returns` **{String}**

**Example**

```js
<%= get({a: {b: 'c'}}, 'a.b') %>
//=> 'c'
```

### [keys](lib/object.js#L91)

Returns an array of keys from the given `object`.

**Params**

* `object` **{Object}**
* `returns` **{Array}**: Keys from `object`

**Example**

```js
<%= keys({a: 'b', c: 'd'}) %>
//=> '["a", "c"]'
```

### [isObject](lib/object.js#L112)

Return true if the given `value` is an object, and not `null` or an array.

**Params**

* `value` **{Object}**: The value to check.
* `returns` **{Boolean}**

**Example**

```js
<%= isObject(['a', 'b', 'c']) %>
//=> 'false'

<%= isObject({a: 'b'}) %>
//=> 'true'
```

### [isPlainObject](lib/object.js#L135)

Return true if the given `value` is a plain object.

**Params**

* `value` **{Object}**: The value to check.
* `returns` **{Boolean}**

**Example**

```js
<%= isPlainObject(['a', 'b', 'c']) %>
//=> 'false'

<%= isPlainObject({a: 'b'}) %>
//=> 'true'

<%= isPlainObject(/foo/g) %>
//=> 'false'
```

### [hasOwn](lib/object.js#L149)

Return true if `key` is an own, enumerable property
of the given `obj`.

**Params**

* `object` **{Object}**
* `key` **{String}**
* `returns` **{Boolean}**

### [omit](lib/object.js#L167)

Return a copy of `object` exclusing the given `keys`.

**Params**

* `object` **{Object}**: Object with keys to omit.
* `keys` **{String}**: Keys to omit.
* `returns` **{Boolean}**

**Example**

```js
<%= omit({a: 'a', b: 'b', c: 'c'}, ['a', 'c']) %>
//=> '{b: "b"}'
```

### [forIn](lib/object.js#L185)

Return a copy of `object` exclusing the given `keys`.

**Params**

* `object` **{Object}**: Object with keys to omit.
* `keys` **{String}**: Keys to omit.
* `returns` **{Boolean}**

**Example**

```js
<%= omit({a: 'a', b: 'b', c: 'c'}, ['a', 'c']) %>
//=> '{b: "b"}'
```

### [forOwn](lib/object.js#L207)

Return a copy of `object` exclusing the given `keys`.

**Params**

* `object` **{Object}**: Object with keys to omit.
* `keys` **{String}**: Keys to omit.
* `returns` **{Boolean}**

**Example**

```js
<%= omit({a: 'a', b: 'b', c: 'c'}, ['a', 'c']) %>
//=> '{b: "b"}'
```

### [extend](lib/object.js#L224)

Extend `o` with properties of other `objects`.

**Params**

* `o` **{Object}**: The target object. Pass an empty object to shallow clone.
* `objects` **{Object}**
* `returns` **{Object}**

### [merge](lib/object.js#L257)

Recursively combine the properties of `o` with the
properties of other `objects`.

**Params**

* `o` **{Object}**: The target object. Pass an empty object to shallow clone.
* `objects` **{Object}**
* `returns` **{Object}**

## path

### [dirname](lib/path.js#L20)

Return the dirname for the given `filepath`. Uses the node.js [path](https://nodejs.org/api/path.html) module.

**Params**

* `filepath` **{String}**
* `returns` **{String}**: Returns the directory part of the file path.

**Example**

```js
<%= dirname("a/b/c/d") %>
//=> 'a/b/c'
```

### [basename](lib/path.js#L38)

Return the basename for the given `filepath`. Uses the node.js [path](https://nodejs.org/api/path.html) module.

**Params**

* `filepath` **{String}**
* `returns` **{String}**: Returns the basename part of the file path.

**Example**

```js
<%= basename("a/b/c/d.js") %>
//=> 'd.js'
```

### [filename](lib/path.js#L56)

Return the filename for the given `filepath`, excluding extension.

**Params**

* `filepath` **{String}**
* `returns` **{String}**: Returns the file name part of the file path.

**Example**

```js
<%= basename("a/b/c/d.js") %>
//=> 'd'
```

### [extname](lib/path.js#L74)

Return the file extension for the given `filepath`. Uses the node.js [path](https://nodejs.org/api/path.html) module.

**Params**

* `filepath` **{String}**
* `returns` **{String}**: Returns a file extension

**Example**

```js
<%= extname("foo.js") %>
//=> '.js'
```

### [ext](lib/path.js#L92)

Return the file extension for the given `filepath`, excluding the `.`.

**Params**

* `filepath` **{String}**
* `returns` **{String}**: Returns a file extension without dot.

**Example**

```js
<%= ext("foo.js") %>
//=> 'js'
```

### [resolve](lib/path.js#L110)

Resolves the given paths to an absolute path. Uses the node.js [path](https://nodejs.org/api/path.html) module.

**Params**

* `filepath` **{String}**
* `returns` **{String}**: Returns a resolve

**Example**

```js
<%= resolve('/foo/bar', './baz') %>
//=> '/foo/bar/baz'
```

### [relative](lib/path.js#L129)

Get the relative path from file `a` to file `b`. Typically `a` and `b` would be variables passed on the context. Uses the node.js [path](https://nodejs.org/api/path.html) module.

**Params**

* `a` **{String}**: The "from" file path.
* `b` **{String}**: The "to" file path.
* `returns` **{String}**: Returns a relative path.

**Example**

```js
<%= relative(a, b) %>
```

### [segments](lib/path.js#L153)

Get specific (joined) segments of a file path by passing a range of array indices.

**Params**

* `filepath` **{String}**: The file path to split into segments.
* `returns` **{String}**: Returns a single, joined file path.

**Example**

```js
<%= segments("a/b/c/d", "2", "3") %>
//=> 'c/d'

<%= segments("a/b/c/d", "1", "3") %>
//=> 'b/c/d'

<%= segments("a/b/c/d", "1", "2") %>
//=> 'b/c'
```

### [join](lib/path.js#L175)

Join all arguments together and normalize the resulting `filepath`. Uses the node.js [path](https://nodejs.org/api/path.html) module.

**Note**: there is also a `join()` array helper, dot notation
can be used with helpers to differentiate. Example: `<%= path.join() %>`.

**Params**

* `filepaths` **{String}**: List of file paths.
* `returns` **{String}**: Returns a single, joined file path.

**Example**

```js
<%= join("a", "b") %>
//=> 'a/b'
```

### [isAbsolute](lib/path.js#L210)

Returns true if a file path is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory. Uses the node.js [path](https://nodejs.org/api/path.html) module.

**Params**

* `filepath` **{String}**
* `returns` **{String}**: Returns a resolve

**Example**

```js
// posix
<%= isAbsolute('/foo/bar') %>
//=> 'true'
<%= isAbsolute('qux/') %>
//=> 'false'
<%= isAbsolute('.') %>
//=> 'false'

// Windows
<%= isAbsolute('//server') %>
//=> 'true'
<%= isAbsolute('C:/foo/..') %>
//=> 'true'
<%= isAbsolute('bar\\baz') %>
//=> 'false'
<%= isAbsolute('.') %>
//=> 'false'
```

### [isRelative](lib/path.js#L245)

Returns true if a file path is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory. Uses the node.js [path](https://nodejs.org/api/path.html) module.

**Params**

* `filepath` **{String}**
* `returns` **{String}**: Returns a resolve

**Example**

```js
// posix
<%= isRelative('/foo/bar') %>
//=> 'false'
<%= isRelative('qux/') %>
//=> 'true'
<%= isRelative('.') %>
//=> 'true'

// Windows
<%= isRelative('//server') %>
//=> 'false'
<%= isRelative('C:/foo/..') %>
//=> 'false'
<%= isRelative('bar\\baz') %>
//=> 'true'
<%= isRelative('.') %>
//=> 'true'
```

## string

### [camelcase](lib/string.js#L18)

camelCase the characters in `string`.

**Params**

* `string` **{String}**: The string to camelcase.
* `returns` **{String}**

**Example**

```js
<%= camelcase("foo bar baz") %>
//=> 'fooBarBaz'
```

### [centerAlign](lib/string.js#L45)

Center align the characters in a string using non-breaking spaces.

**Params**

* `str` **{String}**: The string to reverse.
* `returns` **{String}**: Centered string.

**Example**

```js
<%= centerAlign("abc") %>
```

### [chop](lib/string.js#L69)

Like trim, but removes both extraneous whitespace and non-word characters from the beginning and end of a string.

**Params**

* `string` **{String}**: The string to chop.
* `returns` **{String}**

**Example**

```js
<%= chop("_ABC_") %>
//=> 'ABC'

<%= chop("-ABC-") %>
//=> 'ABC'

<%= chop(" ABC ") %>
//=> 'ABC'
```

### [count](lib/string.js#L90)

Count the number of occurrances of a substring within a string.

**Params**

* `string` **{String}**
* `substring` **{String}**
* `returns` **{Number}**: The occurances of `substring` in `string`

**Example**

```js
<%= count("abcabcabc", "a") %>
//=> '3'
```

### [dotcase](lib/string.js#L110)

dot.case the characters in `string`.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```js
<%= dotcase("a-b-c d_e") %>
//=> 'a.b.c.d.e'
```

### [ellipsis](lib/string.js#L135)

Truncate a string to the specified `length`, and append it with an elipsis, `…`.

**Params**

* `str` **{String}**
* `length` **{Number}**: The desired length of the returned string.
* `ch` **{String}**: Optionally pass custom characters to append. Default is `…`.
* `returns` **{String}**: The truncated string.

**Example**

```js
<%= ellipsis("<span>foo bar baz</span>", 7) %>
//=> 'foo bar…'
```

### [isString](lib/string.js#L157)

Returns true if the value is a string.

**Params**

* `val` **{String}**
* `returns` **{Boolean}**: True if the value is a string.

**Example**

```js
<%= isString('abc') %>
//=> 'true'

<%= isString(null) %>
//=> 'false'
```

### [lowercase](lib/string.js#L174)

Lowercase the characters in the given `string`.

**Params**

* `string` **{String}**: The string to lowercase.
* `returns` **{String}**

**Example**

```js
<%= lowercase("ABC") %>
//=> 'abc'
```

### [pascalcase](lib/string.js#L191)

PascalCase the characters in `string`.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```js
<%= pascalcase("foo bar baz") %>
//=> 'FooBarBaz'
```

### [snakecase](lib/string.js#L211)

snake_case the characters in `string`.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```js
<%= snakecase("a-b-c d_e") %>
//=> 'a_b_c_d_e'
```

### [split](lib/string.js#L233)

Split `string` by the given `character`.

**Params**

* `string` **{String}**: The string to split.
* `returns` **{String}** `character`: Default is `,`

**Example**

```js
<%= split("a,b,c", ",") %>
//=> ['a', 'b', 'c']
```

### [stripIndent](lib/string.js#L250)

Strip the indentation from a `string`.

**Params**

* `string` **{String}**: The string to strip indentation from.
* `returns` **{String}**

**Example**

```js
<%= stripIndent("  _ABC_") %>
//=> 'ABC'
```

### [trim](lib/string.js#L279)

Trim extraneous whitespace from the beginning and end of a string.

**Params**

* `string` **{String}**: The string to trim.
* `returns` **{String}**

**Example**

```js
<%= trim("  ABC   ") %>
//=> 'ABC'
```

### [dashcase](lib/string.js#L298)

dash-case the characters in `string`. This is similar to [slugify], but [slugify] makes the string compatible to be used as a URL slug.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```js
<%= dashcase("a b.c d_e") %>
//=> 'a-b-c-d-e'
```

### [pathcase](lib/string.js#L320)

path/case the characters in `string`.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```js
<%= pathcase("a-b-c d_e") %>
//=> 'a/b/c/d/e'
```

### [sentencecase](lib/string.js#L342)

Sentence-case the characters in `string`.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```js
<%= sentencecase("foo bar baz.") %>
//=> 'Foo bar baz.'
```

### [hyphenate](lib/string.js#L361)

Replace spaces in a string with hyphens. This

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```js
<%= hyphenate("a b c") %>
//=> 'a-b-c'
```

### [reverse](lib/string.js#L397)

Reverse the characters in a string.

**Params**

* `str` **{String}**: The string to reverse.
* `returns` **{String}**

**Example**

```js
<%= reverse("abc") %>
//=> 'cba'
```

### [rightAlign](lib/string.js#L415)

Right align the characters in a string using non-breaking spaces.

**Params**

* `str` **{String}**: The string to reverse.
* `returns` **{String}**: Right-aligned string.

**Example**

```js
<%= rightAlign(str) %>
```

### [replace](lib/string.js#L434)

Replace occurrences of `a` with `b`.

**Params**

* `str` **{String}**
* `a` **{String|RegExp}**: Can be a string or regexp.
* `b` **{String}**
* `returns` **{String}**

**Example**

```js
<%= replace("abcabc", /a/, "z") %>
//=> 'zbczbc'
```

### [titlecase](lib/string.js#L456)

Truncate a string by removing all HTML tags and limiting the result to the specified `length`.

**Params**

* `str` **{String}**
* `length` **{Number}**: The desired length of the returned string.
* `returns` **{String}**: The truncated string.

**Example**

```js
<%= titlecase("big deal") %>
//=> 'foo bar'
```

### [truncate](lib/string.js#L475)

Truncate a string by removing all HTML tags and limiting the result to the specified `length`.

**Params**

* `str` **{String}**
* `length` **{Number}**: The desired length of the returned string.
* `returns` **{String}**: The truncated string.

**Example**

```js
<%= truncate("<span>foo bar baz</span>", 7) %>
//=> 'foo bar'
```

### [uppercase](lib/string.js#L492)

Uppercase the characters in a string.

**Params**

* `string` **{String}**: The string to uppercase.
* `returns` **{String}**

**Example**

```js
<%= uppercase("abc") %>
//=> 'ABC'
```

### [wordwrap](lib/string.js#L514)

Wrap words to a specified width using [word-wrap](https://github.com/jonschlinkert/word-wrap).

**Params**

* `string` **{String}**: The string with words to wrap.
* `object` **{Options}**: Options to pass to [word-wrap](https://github.com/jonschlinkert/word-wrap)
* `returns` **{String}**: Formatted string.

**Example**

```js
<%= wordwrap("a b c d e f", {width: 5, newline: '<br>  '}) %>
//=> '  a b c <br>  d e f'
```

## Code coverage

```
Statements   : 94.61% ( 439/464 )
Branches     : 88.37% ( 190/215 )
Functions    : 96.94% ( 95/98 )
Lines        : 94.42% ( 389/412 )
```

## Related projects

You might also be interested in these projects:

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [handlebars-helpers](https://www.npmjs.com/package/handlebars-helpers): 120+ Handlebars helpers in ~20 categories, for Assemble, YUI, Ghost or any Handlebars project. Includes… [more](https://www.npmjs.com/package/handlebars-helpers) | [homepage](https://github.com/assemble/handlebars-helpers)
* [helper-cache](https://www.npmjs.com/package/helper-cache): Easily register and get helper functions to be passed to any template engine or node.js… [more](https://www.npmjs.com/package/helper-cache) | [homepage](https://github.com/jonschlinkert/helper-cache)
* [template](https://www.npmjs.com/package/template): Render templates using any engine. Supports, layouts, pages, partials and custom template types. Use template… [more](https://www.npmjs.com/package/template) | [homepage](https://github.com/jonschlinkert/template)
* [utils](https://www.npmjs.com/package/utils): Fast, generic JavaScript/node.js utility functions. | [homepage](https://github.com/jonschlinkert/utils)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/template-helpers/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/template-helpers/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on April 25, 2016._
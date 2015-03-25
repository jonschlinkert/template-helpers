# template-helpers [![NPM version](https://badge.fury.io/js/template-helpers.svg)](http://badge.fury.io/js/template-helpers)  [![Build Status](https://travis-ci.org/jonschlinkert/template-helpers.svg)](https://travis-ci.org/jonschlinkert/template-helpers) 

> Generic JavaScript helpers that can be used with any template engine. Handlebars, Lo-Dash, Underscore, or any engine that supports helper functions.

## Install with [npm](npmjs.org)

```bash
npm i template-helpers --save
```

## TOC

<!-- toc -->

- [Usage](#usage)
  * [Use with any template engine](#use-with-any-template-engine)
  * [Namespacing](#namespacing)
- [Code coverage](#code-coverage)
- [Helpers](#helpers)
- [Docs](#docs)
- [Run tests](#run-tests)
- [Related](#related)

<!-- tocstop -->

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


## Code coverage

```
Statements   : 99.72% ( 359/360 )
Branches     : 97.4% ( 187/192 )
Functions    : 100% ( 81/81 )
Lines        : 99.68% ( 310/311 )
```

## Helpers

Currently 84 helpers in 11 sub-categories:

+ **[array](lib/array.js)**
  - [after](lib/array.js#L133)
  - [arrayify](lib/array.js#L46)
  - [before](lib/array.js#L112)
  - [compact](lib/array.js#L263)
  - [difference](lib/array.js#L283)
  - [first](lib/array.js#L64)
  - [isArray](lib/array.js#L22)
  - [join](lib/array.js#L192)
  - [last](lib/array.js#L87)
  - [length](lib/array.js#L245)
  - [map](lib/array.js#L161)
  - [shuffle](lib/array.js#L369)
  - [sort](lib/array.js#L219)
  - [union](lib/array.js#L350)
  - [unique](lib/array.js#L319)
+ **[code](lib/code.js)**
  - [embed](lib/code.js#L25)
  - [jsfiddle](lib/code.js#L51)
+ **[collection](lib/collection.js)**
  - [any](lib/collection.js#L15)
+ **[conditional](lib/conditional.js)**
  - [_if](lib/conditional.js#L13)
+ **[fs](lib/fs.js)**
  - [read](lib/fs.js#L18)
+ **[html](lib/html.js)**
  - [escapeHtml](lib/html.js#L18)
  - [sanitize](lib/html.js#L46)
+ **[math](lib/math.js)**
  - [add](lib/math.js#L19)
  - [ceil](lib/math.js#L108)
  - [divide](lib/math.js#L54)
  - [floor](lib/math.js#L90)
  - [multiply](lib/math.js#L72)
  - [round](lib/math.js#L129)
  - [subtract](lib/math.js#L36)
  - [sum](lib/math.js#L146)
+ **[object](lib/object.js)**
  - [extend](lib/object.js#L183)
  - [fallback](lib/object.js#L25)
  - [get](lib/object.js#L77)
  - [hasOwn](lib/object.js#L152)
  - [isObject](lib/object.js#L115)
  - [isPlainObject](lib/object.js#L138)
  - [keys](lib/object.js#L94)
  - [merge](lib/object.js#L212)
  - [omit](lib/object.js#L170)
  - [parse](lib/object.js#L59)
  - [stringify](lib/object.js#L42)
+ **[path](lib/path.js)**
  - [basename](lib/path.js#L38)
  - [dirname](lib/path.js#L20)
  - [ext](lib/path.js#L92)
  - [extname](lib/path.js#L74)
  - [filename](lib/path.js#L56)
  - [isAbsolute](lib/path.js#L210)
  - [isRelative](lib/path.js#L245)
  - [join](lib/path.js#L175)
  - [relative](lib/path.js#L129)
  - [resolve](lib/path.js#L110)
  - [segments](lib/path.js#L153)
+ **[string](lib/string.js)**
  - [camelcase](lib/string.js#L121)
  - [centerAlign](lib/string.js#L387)
  - [chop](lib/string.js#L102)
  - [count](lib/string.js#L331)
  - [dashcase](lib/string.js#L209)
  - [dotcase](lib/string.js#L185)
  - [ellipsis](lib/string.js#L450)
  - [hyphenate](lib/string.js#L272)
  - [isString](lib/string.js#L23)
  - [lowercase](lib/string.js#L40)
  - [pascalcase](lib/string.js#L143)
  - [pathcase](lib/string.js#L231)
  - [replace](lib/string.js#L407)
  - [reverse](lib/string.js#L349)
  - [rightAlign](lib/string.js#L368)
  - [sentencecase](lib/string.js#L253)
  - [slugify](lib/string.js#L292)
  - [snakecase](lib/string.js#L163)
  - [trim](lib/string.js#L77)
  - [truncate](lib/string.js#L429)
  - [uppercase](lib/string.js#L58)
  - [wordwrap](lib/string.js#L311)

## Docs
### [.isArray](./lib/array.js#L22)

Returns true if `value` is an array.

* `value` **{*}**: The value to test.    
* `returns`: {Boolean}  

```js
<%= isArray('a, b, c') %>
//=> 'false'

<%= isArray(['a, b, c']) %>
//=> 'true'
```

### [.arrayify](./lib/array.js#L46)

Cast `val` to an array.

* `val` **{*}**: The value to arrayify.    
* `returns` **{Array}**: An array.  

* `returns`: {Array}  

```js
<%= arrayify('a') %>
//=> '["a"]'

<%= arrayify({a: 'b'}) %>
//=> '[{a: "b"}]'

<%= arrayify(['a')] %>
//=> '["a"]'
```

### [.first](./lib/array.js#L64)

Returns the first item, or first `n` items of an array.

* `array` **{Array}**    
* `n` **{Number}**: Number of items to return, starting at `0`.    
* `returns`: {Array}  

```js
<%= first(['a', 'b', 'c', 'd', 'e'], 2) %>
//=> '["a", "b"]'
```

### [.last](./lib/array.js#L87)

Returns the last item, or last `n` items of an array.

* `array` **{Array}**    
* `n` **{Number}**: Number of items to return, starting with the last item.    
* `returns`: {Array}  

```js
<%= last(['a', 'b', 'c', 'd', 'e'], 2) %>
//=> '["d", "e"]'
```

### [.before](./lib/array.js#L112)

Returns all of the items in an array up to the specified number Opposite of `<%= after() %`.

* `array` **{Array}**    
* `n` **{Number}**    
* `returns` **{Array}**: Array excluding items after the given number.  

```js
<%= before(['a', 'b', 'c'], 2) %>
//=> '["a", "b"]'
```

### [.after](./lib/array.js#L133)

Returns all of the items in an arry after the specified index. Opposite of `<%= before() %`.

* `array` **{Array}**: Collection    
* `n` **{Number}**: Starting index (number of items to exclude)    
* `returns` **{Array}**: Array exluding `n` items.  

```js
<%= after(['a', 'b', 'c'], 1) %>
//=> '["c"]'
```

### [.map](./lib/array.js#L161)

Returns a new array, created by calling `function` on each element of the given `array`.

* `array` **{Array}**    
* `fn` **{String}**: The function to    
* `returns`: {String}  

```js
function double(str) {
  return str + str;
}
```

Assuming that `double` has been registered as a helper:

```js
<%= map(['a', 'b', 'c'], double) %>
//=> '["aa", "bb", "cc"]'
```

### [.join](./lib/array.js#L192)

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

### [.sort](./lib/array.js#L219)

Sort the given `array`. If an array of objects is passed, you may optionally pass a `key` to sort on as the second argument. You may alternatively pass a sorting function as the second argument.

* `array` **{Array}**: the array to sort.    
* `key` **{String|Function}**: The object key to sort by, or sorting function.    

```js
<%= sort(["b", "a", "c"]) %>
//=> 'a,b,c'

<%= sort([{a: "zzz"}, {a: "aaa"}], "a") %>
//=> '[{"a":"aaa"},{"a":"zzz"}]'
```

### [.length](./lib/array.js#L245)

Returns the length of the given array.

* `array` **{Array}**    
* `returns` **{Number}**: The length of the array.  

```js
<%= length(['a', 'b', 'c']) %>
//=> 3
```

### [.compact](./lib/array.js#L263)

Returns an array with all falsey values removed.

* `arr` **{Array}**    
* `returns`: {Array}  

```js
<%= compact([null, a, undefined, 0, false, b, c, '']) %>
//=> '["a", "b", "c"]'
```

### [.difference](./lib/array.js#L283)

Return the difference between the first array and additional arrays.

* `array` **{Array}**: The array to compare againts.    
* `arrays` **{Array}**: One or more additional arrays.    
* `returns`: {Array}  

```js
<%= difference(["a", "c"], ["a", "b"]) %>
//=> '["c"]'
```

### [.unique](./lib/array.js#L319)

Return an array, free of duplicate values.

* `array` **{Array}**: The array to uniquify    
* `returns` **{Array}**: Duplicate-free array  

```js
<%= unique(['a', 'b', 'c', 'c']) %
=> '["a", "b", "c"]'
```

### [.union](./lib/array.js#L350)

Returns an array of unique values using strict equality for comparisons.

* `arr` **{Array}**    
* `returns`: {Array}  

```js
<%= union(["a"], ["b"], ["c"]) %>
//=> '["a", "b", "c"]'
```

### [.shuffle](./lib/array.js#L369)

Shuffle the items in an array.

* `arr` **{Array}**    
* `returns`: {Array}  

```js
<%= shuffle(["a", "b", "c"]) %>
//=> ["c", "a", "b"]
```

### [.embed](./lib/code.js#L25)

Embed code from an external file as preformatted text.

* `fp` **{String}**: filepath to the file to embed.    
* `language` **{String}**: Optionally specify the language to use for syntax highlighting.    
* `returns`: {String}  

```js
<%= embed('path/to/file.js') %>

// specify the language to use
<%= embed('path/to/file.hbs', 'html') %>
```

### [.jsfiddle](./lib/code.js#L51)

Generate the HTML for a jsFiddle link with the given `params`

* `params` **{Object}**    
* `returns`: {String}  

```js
<%= jsfiddle({id: '0dfk10ks', {tabs: true}}) %>
```

### [.any](./lib/collection.js#L15)

* `value` **{*}**    
* `target` **{*}**    
* `options` **{Object}**    

Returns `true` if `value` exists in the given string, array
or object. See [any] for documentation.

### [._if](./lib/conditional.js#L13)

* `object` **{Object}**    
* `key` **{String}**    
* `returns`: {Boolean}  

Return true if `key` is an own, enumerable property
of the given `obj`.

### [.read](./lib/fs.js#L18)

Read a file from the file system and inject its content

* `filepath` **{String}**: Path of the file to read.    
* `returns` **{String}**: Contents of the given file.  

```js
<%= read("foo.js") %>
```

### [.escapeHtml](./lib/html.js#L18)

Escape HTML characters in a string.

* `str` **{String}**: String of HTML with characters to escape.    
* `returns`: {String}  

```js
<%= escapeHtml("<span>foo</span>") %>
//=> &lt;span&gt;foo&lt;&#x2F;span&gt;
```

### [.sanitize](./lib/html.js#L46)

Strip HTML tags from a string, so that only the text nodes are preserved.

* `str` **{String}**: The string of HTML to sanitize.    
* `returns`: {String}  

```js
<%= sanitize("<span>foo</span>") %>
//=> 'foo'
```



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

### [.sum](./lib/math.js#L146)

Returns the sum of all numbers in the given array.

* `number` **{Number}**    
* `returns`: {Number}  

```js
<%= sum([1, 2, 3, 4, 5]) %>
//=> '15'
```

### [.fallback](./lib/object.js#L25)

Specify a fallback value to use when the desired value is undefined. Note that undefined variables that are _not object properties_ with throw an error.

* `a` **{*}**: The desired value.    
* `b` **{*}**: The fallback ("default") value    
* `returns` **{*}**: Either `a` or `b`  

```js
// when `title` is undefined, use the generic `site.title`
<%= fallback(page.title, site.title) %>
```

### [.stringify](./lib/object.js#L42)

Stringify an object using `JSON.stringify()`.

* `object` **{Object}**    
* `returns`: {String}  

```js
<%= stringify({a: "a"}) %>
//=> '{"a":"a"}'
```

### [.parse](./lib/object.js#L59)

Parse a string into an object using `JSON.parse()`.

* `str` **{String}**: The string to parse.    
* `returns` **{Object}**: The parsed object.  

```js
<%= parse('{"foo":"bar"}')["foo"] %>
//=> 'bar'
```

### [.get](./lib/object.js#L77)

Use property paths (`a.b.c`) get a nested value from an object.

* `object` **{Object}**    
* `path` **{String}**: Dot notation for the property to get.    
* `returns`: {String}  

```js
<%= get({a: {b: 'c'}}, 'a.b') %>
//=> 'c'
```

### [.keys](./lib/object.js#L94)

Returns an array of keys from the given `object`.

* `object` **{Object}**    
* `returns` **{Array}**: Keys from `object`  

```js
<%= keys({a: 'b', c: 'd'}) %>
//=> '["a", "c"]'
```

### [.isObject](./lib/object.js#L115)

Return true if the given `value` is an object, and not `null` or an array.

* `value` **{Object}**: The value to check.    
* `returns`: {Boolean}  

```js
<%= isObject(['a', 'b', 'c']) %>
//=> 'false'

<%= isObject({a: 'b'}) %>
//=> 'true'
```

### [.isPlainObject](./lib/object.js#L138)

Return true if the given `value` is a plain object.

* `value` **{Object}**: The value to check.    
* `returns`: {Boolean}  

```js
<%= isPlainObject(['a', 'b', 'c']) %>
//=> 'false'

<%= isPlainObject({a: 'b'}) %>
//=> 'true'

<%= isPlainObject(/foo/g) %>
//=> 'false'
```

### [.hasOwn](./lib/object.js#L152)

* `object` **{Object}**    
* `key` **{String}**    
* `returns`: {Boolean}  

Return true if `key` is an own, enumerable property
of the given `obj`.

### [.omit](./lib/object.js#L170)

Return a copy of `object` exclusing the given `keys`.

* `object` **{Object}**: Object with keys to omit.    
* `keys` **{String}**: Keys to omit.    
* `returns`: {Boolean}  

```js
<%= omit({a: 'a', b: 'b', c: 'c'}, ['a', 'c']) %>
//=> '{b: "b"}'
```

### [.extend](./lib/object.js#L183)

* `o` **{Object}**: The target object. Pass an empty object to shallow clone.    
* `objects` **{Object}**    
* `returns`: {Object}  

Extend `o` with properties of other `objects`.

### [.merge](./lib/object.js#L212)

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

### [.ext](./lib/path.js#L92)

Return the file extension for the given `filepath`, excluding the `.`.

* `filepath` **{String}**    
* `returns` **{String}**: Returns a file extension without dot.  

```js
<%= ext("foo.js") %>
//=> 'js'
```

### [.resolve](./lib/path.js#L110)

Resolves the given paths to an absolute path. Uses the node.js [path] module.

* `filepath` **{String}**    
* `returns` **{String}**: Returns a resolve  

```js
<%= resolve('/foo/bar', './baz') %>
//=> '/foo/bar/baz'
```

### [.relative](./lib/path.js#L129)

Get the relative path from file `a` to file `b`. Typically `a` and `b` would be variables passed on the context. Uses the node.js [path] module.

* `a` **{String}**: The "from" file path.    
* `b` **{String}**: The "to" file path.    
* `returns` **{String}**: Returns a relative path.  

```js
<%= relative(a, b) %>
```

### [.segments](./lib/path.js#L153)

Get specific (joined) segments of a file path by passing a range of array indices.

* `filepath` **{String}**: The file path to split into segments.    
* `returns` **{String}**: Returns a single, joined file path.  

```js
<%= segments("a/b/c/d", "2", "3") %>
//=> 'c/d'

<%= segments("a/b/c/d", "1", "3") %>
//=> 'b/c/d'

<%= segments("a/b/c/d", "1", "2") %>
//=> 'b/c'
```

### [.join](./lib/path.js#L175)

Join all arguments together and normalize the resulting `filepath`. Uses the node.js [path] module.

* `filepaths` **{String}**: List of file paths.    
* `returns` **{String}**: Returns a single, joined file path.  

**Note**: there is also a `join()` array helper, dot notation
can be used with helpers to differentiate. Example: `<%= path.join() %>`.

```js
<%= join("a", "b") %>
//=> 'a/b'
```

### [.isAbsolute](./lib/path.js#L210)

Returns true if a file path is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory. Uses the node.js [path] module.

* `filepath` **{String}**    
* `returns` **{String}**: Returns a resolve  

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

### [.isRelative](./lib/path.js#L245)

Returns true if a file path is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory. Uses the node.js [path] module.

* `filepath` **{String}**    
* `returns` **{String}**: Returns a resolve  

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

### [.isString](./lib/string.js#L23)

Returns true if the value is a string.

* `val` **{String}**    
* `returns` **{Boolean}**: True if the value is a string.  

```js
<%= isString('abc') %>
//=> 'true'

<%= isString(null) %>
//=> 'false'
```

### [.lowercase](./lib/string.js#L40)

Lowercase the characters in the given `string`.

* `string` **{String}**: The string to lowercase.    
* `returns`: {String}  

```js
<%= lowercase("ABC") %>
//=> 'abc'
```

### [.uppercase](./lib/string.js#L58)

Uppercase the characters in a string.

* `string` **{String}**: The string to uppercase.    
* `returns`: {String}  

```js
<%= uppercase("abc") %>
//=> 'ABC'
```

### [.trim](./lib/string.js#L77)

Trim extraneous whitespace from the beginning and end of a string.

* `string` **{String}**: The string to trim.    
* `returns`: {String}  

```js
<%= trim("  ABC   ") %>
//=> 'ABC'
```

### [.chop](./lib/string.js#L102)

Like trim, but removes both extraneous whitespace and non-word characters from the beginning and end of a string.

* `string` **{String}**: The string to chop.    
* `returns`: {String}  

```js
<%= chop("_ABC_") %>
//=> 'ABC'

<%= chop("-ABC-") %>
//=> 'ABC'

<%= chop(" ABC ") %>
//=> 'ABC'
```

### [.camelcase](./lib/string.js#L121)

camelCase the characters in `string`.

* `string` **{String}**: The string to camelcase.    
* `returns`: {String}  

```js
<%= camelcase("foo bar baz") %>
//=> 'fooBarBaz'
```

### [.pascalcase](./lib/string.js#L143)

PascalCase the characters in `string`.

* `string` **{String}**    
* `returns`: {String}  

```js
<%= pascalcase("foo bar baz") %>
//=> 'FooBarBaz'
```

### [.snakecase](./lib/string.js#L163)

snake_case the characters in `string`.

* `string` **{String}**    
* `returns`: {String}  

```js
<%= snakecase("a-b-c d_e") %>
//=> 'a_b_c_d_e'
```

### [.dotcase](./lib/string.js#L185)

dot.case the characters in `string`.

* `string` **{String}**    
* `returns`: {String}  

```js
<%= dotcase("a-b-c d_e") %>
//=> 'a.b.c.d.e'
```

### [.dashcase](./lib/string.js#L209)

dash-case the characters in `string`. This is similar to [slugify], but [slugify] makes the string compatible to be used as a URL slug.

* `string` **{String}**    
* `returns`: {String}  

```js
<%= dashcase("a b.c d_e") %>
//=> 'a-b-c-d-e'
```

### [.pathcase](./lib/string.js#L231)

path/case the characters in `string`.

* `string` **{String}**    
* `returns`: {String}  

```js
<%= pathcase("a-b-c d_e") %>
//=> 'a/b/c/d/e'
```

### [.sentencecase](./lib/string.js#L253)

Sentence-case the characters in `string`.

* `string` **{String}**    
* `returns`: {String}  

```js
<%= sentencecase("foo bar baz.") %>
//=> 'Foo bar baz.'
```

### [.hyphenate](./lib/string.js#L272)

Replace spaces in a string with hyphens. This

* `string` **{String}**    
* `returns`: {String}  

```js
<%= hyphenate("a b c") %>
//=> 'a-b-c'
```

### [.wordwrap](./lib/string.js#L311)

Wrap words to a specified width using [word-wrap].

* `string` **{String}**: The string with words to wrap.    
* `object` **{Options}**: Options to pass to [word-wrap]    
* `returns` **{String}**: Formatted string.  

```js
<%= wordwrap("a b c d e f", {width: 5, newline: '<br>  '}) %>
//=> '  a b c <br>  d e f'
```

### [.count](./lib/string.js#L331)

Count the number of occurrances of a substring within a string.

* `string` **{String}**    
* `substring` **{String}**    
* `returns` **{Number}**: The occurances of `substring` in `string`  

```js
<%= count("abcabcabc", "a") %>
//=> '3'
```

### [.reverse](./lib/string.js#L349)

Reverse the characters in a string.

* `str` **{String}**: The string to reverse.    
* `returns`: {String}  

```js
<%= reverse("abc") %>
//=> 'cba'
```

### [.rightAlign](./lib/string.js#L368)

Right align the characters in a string using non-breaking spaces.

* `str` **{String}**: The string to reverse.    
* `returns` **{String}**: Right-aligned string.  

```js
<%= rightAlign(str) %>
```

### [.centerAlign](./lib/string.js#L387)

Center align the characters in a string using non-breaking spaces.

* `str` **{String}**: The string to reverse.    
* `returns` **{String}**: Centered string.  

```js
<%= centerAlign("abc") %>
```

### [.replace](./lib/string.js#L407)

Replace occurrences of `a` with `b`.

* `str` **{String}**    
* `a` **{String|RegExp}**: Can be a string or regexp.    
* `b` **{String}**    
* `returns`: {String}  

```js
<%= replace("abcabc", /a/, "z") %>
//=> 'zbczbc'
```

### [.truncate](./lib/string.js#L429)

Truncate a string by removing all HTML tags and limiting the result to the specified `length`.

* `str` **{String}**    
* `length` **{Number}**: The desired length of the returned string.    
* `returns` **{String}**: The truncated string.  

```js
<%= truncate("<span>foo bar baz</span>", 7) %>
//=> 'foo bar'
```

### [.ellipsis](./lib/string.js#L450)

Truncate a string to the specified `length`, and append it with an elipsis, `…`.

* `str` **{String}**    
* `length` **{Number}**: The desired length of the returned string.    
* `ch` **{String}**: Optionally pass custom characters to append. Default is `…`.    
* `returns` **{String}**: The truncated string.  

```js
<%= ellipsis("<span>foo bar baz</span>", 7) %>
//=> 'foo bar…'
```

## Run tests
Install dev dependencies.

```bash
npm i -d && npm test
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/template-helpers/issues)

## Related
* [handlebars-helpers](https://github.com/assemble/handlebars-helpers): 120+ Handlebars helpers in ~20 categories, for Assemble, YUI, Ghost or any Handlebars project. Includes helpers like {{i18}}, {{markdown}}, {{relative}}, {{extend}}, {{moment}}, and so on.

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2015 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on March 25, 2015._

[assemble]: https://github.com/assemble/assemble
[verb]: https://github.com/assemble/verb
[template]: https://github.com/jonschlinkert/template
[word-wrap]: https://github.com/jonschlinkert/word-wrap
[helper-concat]: https://github.com/helpers/helper-concat
[path]: https://nodejs.org/api/path.html
<!-- deps:mocha jshint-stylish -->

[any]: https://github.com/jonschlinkert/any
[arr-flatten]: https://github.com/jonschlinkert/arr-flatten
[center-align]: https://github.com/jonschlinkert/center-align
[export-files]: https://github.com/jonschlinkert/export-files
[get-value]: https://github.com/jonschlinkert/get-value
[is-number]: https://github.com/jonschlinkert/is-number
[is-plain-object]: https://github.com/jonschlinkert/is-plain-object
[isobject]: https://github.com/jonschlinkert/isobject
[kind-of]: https://github.com/jonschlinkert/kind-of
[object-omit]: https://github.com/jonschlinkert/object-omit
[relative]: https://github.com/jonschlinkert/relative
[right-align]: https://github.com/jonschlinkert/right-align
[to-gfm-code-block]: https://github.com/jonschlinkert/to-gfm-code-block
[word-wrap]: https://github.com/jonschlinkert/word-wrap

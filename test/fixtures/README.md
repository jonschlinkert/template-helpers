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


## Helpers
Currently 87 helpers:

+ **[array](lib/array.js)**
  - [after](lib/array.js#L131)
  - [arrayify](lib/array.js#L44)
  - [before](lib/array.js#L110)
  - [compact](lib/array.js#L260)
  - [difference](lib/array.js#L280)
  - [first](lib/array.js#L62)
  - [isArray](lib/array.js#L21)
  - [join](lib/array.js#L191)
  - [last](lib/array.js#L85)
  - [length](lib/array.js#L242)
  - [map](lib/array.js#L159)
  - [sort](lib/array.js#L217)
  - [union](lib/array.js#L347)
  - [unique](lib/array.js#L316)
+ **[code](lib/code.js)**
  - [embed](lib/code.js#L25)
  - [jsfiddle](lib/code.js#L51)
+ **[collection](lib/collection.js)**
  - [any](lib/collection.js#L15)
+ **[conditional](lib/conditional.js)**
  - [_if](lib/conditional.js#L13)
+ **[fs](lib/fs.js)**
  - [concat](lib/fs.js#L40)
  - [read](lib/fs.js#L19)
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
  - [extend](lib/object.js#L224)
  - [fallback](lib/object.js#L25)
  - [forIn](lib/object.js#L187)
  - [forOwn](lib/object.js#L207)
  - [get](lib/object.js#L77)
  - [hasOwn](lib/object.js#L152)
  - [isObject](lib/object.js#L115)
  - [isPlainObject](lib/object.js#L138)
  - [keys](lib/object.js#L94)
  - [merge](lib/object.js#L253)
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
  - [camelcase](lib/string.js#L142)
  - [centerAlign](lib/string.js#L408)
  - [chop](lib/string.js#L123)
  - [count](lib/string.js#L352)
  - [dashcase](lib/string.js#L230)
  - [dotcase](lib/string.js#L206)
  - [ellipsis](lib/string.js#L476)
  - [hyphenate](lib/string.js#L293)
  - [isString](lib/string.js#L23)
  - [lowercase](lib/string.js#L61)
  - [pascalcase](lib/string.js#L164)
  - [pathcase](lib/string.js#L252)
  - [replace](lib/string.js#L428)
  - [reverse](lib/string.js#L370)
  - [rightAlign](lib/string.js#L389)
  - [sentencecase](lib/string.js#L274)
  - [slugify](lib/string.js#L313)
  - [snakecase](lib/string.js#L184)
  - [toString](lib/string.js#L44)
  - [trim](lib/string.js#L98)
  - [truncate](lib/string.js#L455)
  - [uppercase](lib/string.js#L79)
  - [wordwrap](lib/string.js#L332)

## Docs


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

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on March 11, 2015._

[assemble]: https://github.com/assemble/assemble
[verb]: https://github.com/assemble/verb
[template]: https://github.com/jonschlinkert/template
[word-wrap]: https://github.com/jonschlinkert/word-wrap
[helper-concat]: https://github.com/helpers/helper-concat
[path]: https://nodejs.org/api/path.html
<!-- deps:mocha jshint-stylish -->
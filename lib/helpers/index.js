'use strict';

const define = (obj, k, fn) => {
  Reflect.defineProperty(obj, k, {
    enumerable: true,
    get: fn
  });
};

define(exports, 'string', () => require('./string'));
define(exports, 'path', () => require('./path'));
define(exports, 'object', () => require('./object'));
define(exports, 'math', () => require('./math'));
define(exports, 'html', () => require('./html'));
define(exports, 'fs', () => require('./fs'));
define(exports, 'conditional', () => require('./conditional'));
define(exports, 'collection', () => require('./collection'));
define(exports, 'code', () => require('./code'));
define(exports, 'array', () => require('./array'));

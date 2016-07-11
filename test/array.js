/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var helpers = require('..')('array');
var template = require('lodash.template');

var context = {arr: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']};
var imports = {imports: helpers};

describe('isArray', function() {
  it('should return true if the value is an array.', function() {
    assert.equal(template('<%= isArray("foo") %>', imports)(), 'false');
    assert.equal(template('<%= isArray(["foo"]) %>', imports)(), 'true');
  });
});

describe('arrayify', function() {
  it('should coerce a value to an array.', function() {
    assert.equal(template('<%= isArray(arrayify("foo")) %>', imports)(), 'true');
    assert.equal(template('<%= isArray(arrayify(["foo"])) %>', imports)(), 'true');
  });
});

describe('first', function() {
  it('should return an empty string when undefined.', function() {
    assert.equal(template('<%= first() %>', imports)(), '');
  });

  it('should return the first item in an array.', function() {
    var fn = template('<%= first(foo) %>', imports);
    assert.equal(fn({foo: ['a', 'b', 'c']}), 'a');
  });

  it('should return an array with the first two items in an array.', function() {
    var fn = template('<%= first(foo, 2) %>', imports);
    assert.deepEqual(fn({foo: ['a', 'b', 'c']}), ['a', 'b'].toString());
  });
});

describe('last', function() {
  it('should return an empty string when undefined.', function() {
    assert.equal(template('<%= last() %>', imports)(), '');
  });

  it('should return the last item in an array.', function() {
    assert.equal(template('<%= last(arr) %>', imports)(context), 'h');
  });
  it('should return an array with the last two items in an array.', function() {
    assert.deepEqual(template('<%= last(arr, 2) %>', imports)(context), ['g', 'h'].toString());
  });
});

describe('before', function() {
  it('should return an empty string when undefined.', function() {
    assert.equal(template('<%= before() %>', imports)(), '');
  });
  it('should return all of the items in an array before the given index.', function() {
    var fn = template('<%= before(arr, 5) %>', imports);
    assert.deepEqual(fn(context), ['a', 'b', 'c'].toString());
  });
});

describe('after', function() {
  it('should return an empty string when undefined.', function() {
    assert.equal(template('<%= after() %>', imports)(), '');
  });

  it('should return all of the items in an array after the given index.', function() {
    var fn = template('<%= after(arr, 5) %>', imports);
    assert.deepEqual(fn(context), ['f', 'g', 'h'].toString());
  });
});

describe('join', function() {
  it('should return an empty string when undefined.', function() {
    assert.equal(template('<%= join() %>', imports)(), '');
  });

  it('should return all items in an array joined by the default separator.', function() {
    var fn = template('<%= join(arr) %>', imports);
    assert.equal(fn(context), 'a, b, c, d, e, f, g, h');
  });

  it('should return all items in an array joined by the given separator.', function() {
    var fn = template('<%= join(arr, " | ") %>', imports);
    assert.equal(fn(context), 'a | b | c | d | e | f | g | h');
  });
});

describe('each', function() {
  it('should return an empty string when undefined.', function() {
    assert.equal(template('<%= each() %>', imports)(), '');
  });

  it('should iterate over items in the array and return new values.', function() {
    var o = {};
    o.double = function(str) {
      return str + str;
    };
    var fn = template('<%= each(["a","b","c"], double) %>', imports);
    assert.equal(fn(o), 'aabbcc');
  });

  it('should expose the given context to each item', function() {
    var o = {ctx: {sep: ' '}};
    o.double = function(str) {
      return str + this.sep + str;
    };
    var fn = template('<%= each(["a","b","c"], double, ctx) %>', imports);
    assert.equal(fn(o), 'a ab bc c');
  });
});

describe('map', function() {
  it('should return an empty string when undefined.', function() {
    assert.equal(template('<%= map() %>', imports)(), '');
  });

  it('should map the items in the array and return new values.', function() {
    var o = {};
    o.double = function(str) {
      return str + str;
    };
    var fn = template('<%= map(["a","b","c"], double) %>', imports);
    assert.equal(fn(o), 'aa,bb,cc');
  });
});

describe('sort', function() {
  it('should return an empty string when undefined.', function() {
    assert.equal(template('<%= sort() %>', imports)(), '');
  });

  it('should sort the items in an array.', function() {
    var fn = template('<%= sort(["b", "c", "a"]) %>', imports);
    assert.equal(fn(context), 'a,b,c');
  });

  it('should take a compare function.', function() {
    var o = {};
    o.compare = function(a, b) {
      return b.localeCompare(a);
    };
    var fn = template('<%= sort(["b", "c", "a"], compare) %>', imports);
    assert.equal(fn(o), 'c,b,a');
  });

  it('should sort based on object key:', function() {
    var fn = template('<%= JSON.stringify(sort([{a: "zzz"}, {a: "aaa"}], "a")) %>', imports);
    assert.equal(fn(), '[{"a":"aaa"},{"a":"zzz"}]');
  });
});

describe('length', function() {
  it('should return an empty string when undefined.', function() {
    assert.equal(template('<%= length() %>', imports)(), '');
  });

  it('should return zero when the value is not an array.', function() {
    var fn = template('<%= length("foo") %>', imports);
    assert.equal(fn(context), '0');
  });

  it('should return the length of an array.', function() {
    var fn = template('<%= length(["b", "c", "a"]) %>', imports);
    assert.equal(fn(context), '3');
  });
});

describe('compact', function() {
  it('should return an empty string when undefined.', function() {
    assert.equal(template('<%= compact() %>', imports)(), '');
  });

  it('should remove falsey values from an array.', function() {
    var fn = template('<%= compact([null, "a", undefined, 0, false, "b", "c", ""]) %>', imports);
    assert.equal(fn(context), 'a,b,c');
  });
});

describe('difference', function() {
  it('should return an empty string when undefined.', function() {
    assert.equal(template('<%= difference() %>', imports)(), '');
  });

  it('should return the difference from multiple arrays', function() {
    var o = {};
    o.a = ['a', 'b', 'c', 'd'];
    o.b = ['b', 'c'];
    o.c = ['x', 'y'];
    assert.equal(template('<%= difference(a, b, c) %>', imports)(o), 'a,d');
    assert.equal(template('<%= difference(a, b) %>', imports)(o), 'a,d');
    assert.equal(template('<%= difference(a) %>', imports)(o), 'a,b,c,d');
  });
});

describe('unique', function() {
  it('should return an empty string when undefined.', function() {
    assert.equal(template('<%= unique() %>', imports)(), '');
  });
  it('should unique items from multiple arrays:', function() {
    var fn = template('<%= unique(["a", "b", "c", "c"]) %>', imports);
    assert.equal(fn(context), 'a,b,c');
  });
});

describe('union', function() {
  it('should return an empty string when undefined.', function() {
    assert.equal(template('<%= union() %>', imports)(), '');
  });

  it('should union items from multiple arrays:', function() {
    var fn = template('<%= union(["a", "c"], ["b", "b"]) %>', imports);
    assert.equal(fn(context), 'a,c,b');
  });

  it('should union items from multiple arrays:', function() {
    var fn = template('<%= union(["a"], ["b"]) %>', imports);
    assert.equal(fn(context), 'a,b');
  });
});

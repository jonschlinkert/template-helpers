/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var helpers = require('..');
var _ = require('lodash');

var context = {arr: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']};
var imports = {imports: helpers.arrays};


describe('first', function() {
  it('Should return the first item in an array.', function() {
    var template = _.template('<%= first(foo) %>', imports);
    template({foo: ['a', 'b', 'c']}).should.equal('a');
  });

  it('Should return an array with the first two items in an array.', function() {
    var template = _.template('<%= first(foo, 2) %>', imports);
    template({foo: ['a', 'b', 'c']}).should.eql(['a', 'b'].toString());
  });
});

describe('last', function() {
  it('Should return the last item in an array.', function() {
    _.template('<%= last(arr) %>', imports)(context).should.equal('h');
  });
  it('Should return an array with the last two items in an array.', function() {
    _.template('<%= last(arr, 2) %>', imports)(context).should.eql(['g', 'h'].toString());
  });
});

describe('before', function() {
  it('Should return all of the items in an array before the given index.', function() {
    var template = _.template('<%= before(arr, 5) %>', imports);
    template(context).should.eql(['a', 'b', 'c'].toString());
  });
});

describe('after', function() {
  it('Should return all of the items in an array after the given index.', function() {
    var template = _.template('<%= after(arr, 5) %>', imports);
    template(context).should.eql(['f', 'g', 'h'].toString());
  });
});

describe('join', function() {
  it('Should return all items in an array joined by the given separator.', function() {
    var template = _.template('<%= join(arr, " | ") %>', imports);
    template(context).should.equal('a | b | c | d | e | f | g | h');
  });
});

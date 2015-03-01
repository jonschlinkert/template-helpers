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

var imports = {imports: helpers.math};

describe('add', function() {
  it('should return a plus b', function() {
    _.template('<%= add(5, 5) %>', imports)().should.equal('10');
  });

  it('should return a minus b.', function() {
    _.template('<%= subtract(10, 2) %>', imports)().should.equal('8');
  });

  it('should divide a by b.', function() {
    _.template('<%= divide(30, 10) %>', imports)().should.equal('3');
  });

  it('should multiply a by b.', function() {
    _.template('<%= multiply(30, 10) %>', imports)().should.equal('300');
  });

  it('should floor `num`.', function() {
    _.template('<%= floor(55.5) %>', imports)().should.equal('55');
  });

  it('should ceil `num`.', function() {
    _.template('<%= ceil(55.5) %>', imports)().should.equal('56');
  });

  it('should reduce-sum the numbers in the array.', function() {
    _.template('<%= sum([1, 2, 3, 4, 5]) %>', imports)().should.equal('15');
  });
});

console.log(helpers)

/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var helpers = require('..')('math');
var _ = require('lodash');

var imports = {imports: helpers};

describe('math helpers', function() {
  describe('add', function () {
    it('should return a plus b', function() {
      _.template('<%= add(5, 5) %>', imports)().should.equal('10');
    });
  });

  describe('subtract', function () {
    it('should return a minus b.', function() {
      _.template('<%= subtract(10, 2) %>', imports)().should.equal('8');
    });
  });

  describe('divide', function () {
    it('should divide a by b.', function() {
      _.template('<%= divide(30, 10) %>', imports)().should.equal('3');
    });
  });

  describe('multiply', function () {
    it('should multiply a by b.', function() {
      _.template('<%= multiply(30, 10) %>', imports)().should.equal('300');
    });
  });

  describe('floor', function () {
    it('should floor `num`.', function() {
      _.template('<%= floor(55.5) %>', imports)().should.equal('55');
    });
  });

  describe('ceil', function () {
    it('should ceil `num`.', function() {
      _.template('<%= ceil(55.5) %>', imports)().should.equal('56');
    });
  });

  describe('round', function () {
    it('should round a number.', function() {
      _.template('<%= round(21.1) %>', imports)().should.equal('21');
      _.template('<%= round(21.5) %>', imports)().should.equal('22');
    });
  });

  describe('sum.', function() {
    it('should reduce-sum the numbers in the array.', function() {
      _.template('<%= sum([1, 2, 3, 4, 5]) %>', imports)().should.equal('15');
    });
    it('should ignore non-numbers.', function() {
      _.template('<%= sum([1, 2, "foo", 3, 4, 5]) %>', imports)().should.equal('15');
    });
  });
});

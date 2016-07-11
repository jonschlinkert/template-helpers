/*!
 * template-helpers <https://github.com/jonschlinkert/template-helpers>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var assert = require('assert');
var helpers = require('..')('math');
var template = require('lodash.template');

var imports = {imports: helpers};

describe('math helpers', function() {
  describe('add', function() {
    it('should return a plus b', function() {
      assert.equal(template('<%= add(5, 5) %>', imports)(), '10');
    });
  });

  describe('subtract', function() {
    it('should return a minus b.', function() {
      assert.equal(template('<%= subtract(10, 2) %>', imports)(), '8');
    });
  });

  describe('divide', function() {
    it('should divide a by b.', function() {
      assert.equal(template('<%= divide(30, 10) %>', imports)(), '3');
    });
  });

  describe('multiply', function() {
    it('should multiply a by b.', function() {
      assert.equal(template('<%= multiply(30, 10) %>', imports)(), '300');
    });
  });

  describe('floor', function() {
    it('should floor `num`.', function() {
      assert.equal(template('<%= floor(55.5) %>', imports)(), '55');
    });
  });

  describe('ceil', function() {
    it('should ceil `num`.', function() {
      assert.equal(template('<%= ceil(55.5) %>', imports)(), '56');
    });
  });

  describe('round', function() {
    it('should round a number.', function() {
      assert.equal(template('<%= round(21.1) %>', imports)(), '21');
      assert.equal(template('<%= round(21.5) %>', imports)(), '22');
    });
  });

  describe('sum.', function() {
    it('should reduce-sum the numbers in the array.', function() {
      assert.equal(template('<%= sum([1, 2, 3, 4, 5]) %>', imports)(), '15');
    });
    it('should ignore non-numbers.', function() {
      assert.equal(template('<%= sum([1, 2, "foo", 3, 4, 5]) %>', imports)(), '15');
    });
  });
});

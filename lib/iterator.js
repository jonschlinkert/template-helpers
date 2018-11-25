'use strict';

const typeOf = require('kind-of');
const prop = name => obj => obj[name];
const noop = val => val;

module.exports = (target, thisArg) => {
  const invoke = (val, i, arr) => target.call(thisArg, val, i, arr);
  switch (typeOf(target)) {
    case 'undefined':
    case 'null':
      return noop;
    case 'function':
      return (thisArg === void 0) ? target : invoke;
    case 'object':
      return val => isMatch(val, target);
    case 'regexp':
      return str => target.test(str);
    case 'string':
    case 'number':
    default: {
      return prop(target);
    }
  }
};

function containsMatch(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (isMatch(array[i], value)) {
      return true;
    }
  }
  return false;
}

function matchArray(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (!containsMatch(array, value[i])) {
      return false;
    }
  }
  return true;
}

function matchObject(obj, value) {
  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      if (isMatch(obj[key], value[key]) === false) {
        return false;
      }
    }
  }
  return true;
}

function isMatch(val, value) {
  if (typeOf(val) === 'object') {
    if (Array.isArray(val) && Array.isArray(value)) {
      return matchArray(val, value);
    }
    return matchObject(val, value);
  }
  return val === value;
}

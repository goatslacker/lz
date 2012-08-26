var lz = require('../')
var wu = require('wu').wu

var assert = require('assert')

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

var is_five = function (n) { return n === 5 }

function _lz() {
  return new lz(a).any(is_five)
}

function _wu() {
  return wu(a).any(is_five)
}

assert.deepEqual(_lz(), _wu())

require('./')({
  'lz': _lz,
  'wu': _wu
})

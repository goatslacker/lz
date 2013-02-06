var lz = require('../')
var wu = require('wu').wu

var assert = require('assert')

var data = require('./_data').a

var is_five = function (n) { return n === 5 }

function _lz() {
  return new lz(data).any(is_five)
}

function _wu() {
  return wu(data).any(is_five)
}

assert.deepEqual(_lz(), _wu())

require('./')({
  'lz': _lz,
  'wu': _wu
})

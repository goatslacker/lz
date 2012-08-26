var lz = require('../')
var _ = require('lodash')
var wu = require('wu').wu

var assert = require('assert')

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function _lodash() {
  return _.contains(a, 5)
}

function _lz() {
  return new lz(a).elem(5)
}

function _wu() {
  return wu(a).has(5)
}

assert.deepEqual(_lodash(), _lz())
assert.deepEqual(_lz(), _wu())

require('./')({
  'lodash': _lodash,
  'lz': _lz,
  'wu': _wu
})

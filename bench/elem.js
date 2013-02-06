var lz = require('../')
var _ = require('lodash')
var wu = require('wu').wu

var assert = require('assert')

var data = require('./_data').a

function _lodash() {
  return _.contains(data, 5)
}

function _lz() {
  return new lz(data).elem(5)
}

function _wu() {
  return wu(data).has(5)
}

assert.deepEqual(_lodash(), _lz())
assert.deepEqual(_lz(), _wu())

require('./')({
  'lodash': _lodash,
  'lz': _lz,
  'wu': _wu
})

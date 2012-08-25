var lz = require('../')
var _ = require('lodash')
var wu = require('wu').wu

var assert = require('assert')

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function _lodash() {
  return _.first(a)
}

function _lz() {
  return new lz(a).head()
}

function _wu() {
  return wu(a).next()
}

assert.deepEqual(_lodash(), _lz())
assert.deepEqual(_lz(), _wu())

exports.compare = {
  'lodash': _lodash,
  'lz': _lz,
  'wu': _wu
}

require('bench').runMain()

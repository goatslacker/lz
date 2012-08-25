var lz = require('../')
var _ = require('lodash')
var wu = require('wu').wu

var assert = require('assert')

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

var sqr = function (n) {
  return n * n
}

function _lodash() {
  return _.map(a, sqr).shift()
}

function _lz() {
  return new lz(a).map(sqr).head()
}

function _wu() {
  return wu(a).map(sqr).next()
}

assert.deepEqual(_lodash(), _lz())
assert.deepEqual(_lz(), _wu())

exports.compare = {
  'lodash': _lodash,
  'lz': _lz,
  'wu': _wu
}

require('bench').runMain()

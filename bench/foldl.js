var lz = require('../')
var _ = require('lodash')
var wu = require('wu').wu

var assert = require('assert')

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

var sum = function (a, b) {
  return a + b
}

function _lodash() {
  return _.reduce(a, sum)
}

function _lodash_chained() {
  return _.chain(a).reduce(sum).value()
}

function _lz() {
  return new lz(a).foldl(sum)
}

function _wu() {
  return wu(a).reduce(sum)
}

assert.deepEqual(_lodash(), _lz())
assert.deepEqual(_lz(), _wu())

exports.compare = {
  'lodash': _lodash,
  'lodash chained': _lodash_chained,
  'lz': _lz,
  'wu': _wu
}

require('bench').runMain()

var lz = require('../')
var _ = require('lodash')
var wu = require('wu').wu

var assert = require('assert')

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var b = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

function _lodash() {
  return _.map(_.zip(a, b), function (n) { return n[0] - n[1] }).slice(0, 3)
}

function _lz() {
  return lz
  .zipWith(function (a, b) { return a - b }, a, b)
  .take(3)
  .$()
}

function _wu() {
  return wu
  .zipWith(function (a, b) { return a - b }, a, b)
  .toArray()
  .slice(0, 3)
}

assert.deepEqual(_lodash(), _lz())
assert.deepEqual(_lz(), _wu())

exports.compare = {
  'lodash': _lodash,
  'lz': _lz,
  'wu': _wu
}

require('bench').runMain()

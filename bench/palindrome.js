var lz = require('../')
var _ = require('lodash')
var wu = require('wu').wu

var assert = require('assert')

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

var eq = function (a, b) {
  return a === b
}

function _lodash() {
  return _.every(
    _.map(
      _.zip(a, a.reverse()), function (a) { return a[0] === a[1] }
    )
    , function (n) { return n === true }
  )
}

function _lz() {
  return lz
  .zipWith(eq, a, a.reverse())
  .and()
}

function _wu() {
  return wu
  .zipWith(eq, a, a.reverse())
  .all()
}

assert.deepEqual(_lodash(), _lz())
assert.deepEqual(_lz(), _wu())

exports.compare = {
  'lodash': _lodash,
  'lz': _lz,
  'wu': _wu
}

require('bench').runMain()

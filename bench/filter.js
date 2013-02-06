var lz = require('../')
var _ = require('lodash')
var wu = require('wu').wu

var assert = require('assert')

var data = require('./_data').a

var even = function (n) {
  return n % 2 === 0
}

function _lodash() {
  return _.first(_.filter(data, even))
}

function _lz() {
  return new lz(data).filter(even).head()
}

function _wu() {
  return wu(data).filter(even).next()
}

assert.deepEqual(_lodash(), _lz())
assert.deepEqual(_lz(), _wu())

require('./')({
  'lodash': _lodash,
  'lz': _lz,
  'wu': _wu
})

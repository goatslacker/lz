var lz = require('../')
var _ = require('lodash')
var wu = require('wu').wu

var assert = require('assert')

var data = require('./_data').a

function _lodash() {
  return _.first(data)
}

function _lz() {
  return new lz(data).head()
}

function _wu() {
  return wu(data).next()
}

assert.deepEqual(_lodash(), _lz())
assert.deepEqual(_lz(), _wu())

require('./')({
  'lodash': _lodash,
  'lz': _lz,
  'wu': _wu
})

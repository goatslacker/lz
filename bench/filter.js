var lz = require('../')
var lzy = require('../lzy')
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

function _lzy() {
  return lzy.head(lzy.filter(even, [1, 2, 3]))
}

assert.deepEqual(_lodash(), _lz())
assert.deepEqual(_lz(), _wu())
assert.deepEqual(_wu(), _lzy())

require('./')({
  'lodash': _lodash,
  'lz': _lz,
  'wu': _wu,
  'lzy': _lzy
})

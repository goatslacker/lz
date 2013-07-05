var lz = require('../')
var lzy = require('../lzy')
var _ = require('lodash')
var wu = require('wu').wu

var assert = require('assert')

var data = require('./_data').a

var sqr = function (n) {
  return n * n
}

function _lodash() {
  return _.first(_.map(data, sqr), 5)
}

function _lz() {
  return new lz(data).map(sqr).take(5).$()
}

function _wu() {
  var f = wu(data).map(sqr)
  var r = []
  r.push(f.next())
  r.push(f.next())
  r.push(f.next())
  r.push(f.next())
  r.push(f.next())
  return r
}

function _lzy() {
  return lzy.take(5, lzy.map(sqr, data))
}

assert.deepEqual(_lodash(), _lz())
assert.deepEqual(_lz(), _wu())
assert.deepEqual(_lz(), _lzy())

require('./')({
  'lodash': _lodash,
  'lz': _lz,
  'wu': _wu,
  'lzy': _lzy
})

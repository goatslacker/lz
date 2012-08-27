var lz = require('../')
var _ = require('lodash')

var assert = require('assert')

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function _lodashmx() {
  return _.max(a)
}

function _lzmx() {
  return lz.max(a)
}

function _lodashmn() {
  return _.max(a)
}

function _lzmn() {
  return lz.max(a)
}

assert.deepEqual(_lodashmx(), _lzmx())
assert.deepEqual(_lodashmn(), _lzmn())

require('./')({
  'lodash max': _lodashmx,
  'lz max': _lzmx,

  'lodash min': _lodashmn,
  'lz min': _lzmn
})

var lz = require('../')
var _ = require('lodash')

var assert = require('assert')

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function _lodash() {
  return _.rest(a)
}

function _lz() {
  return new lz(a).tail().$()
}

assert.deepEqual(_lodash(), _lz())

exports.compare = {
  'lodash': _lodash,
  'lz': _lz
}

require('bench').runMain()

var lz = require('../')
var _ = require('lodash')

var assert = require('assert')

var even = function (n) {
  return n % 2 === 0
}

function _lodash() {
  return _.first(_.filter(_.range(1, 10), even))
}

function _lz() {
  return lz.range(1, 9).filter(even).head()
}

assert.deepEqual(_lodash(), _lz())

exports.compare = {
  'lodash': _lodash,
  'lz': _lz
}

require('bench').runMain()

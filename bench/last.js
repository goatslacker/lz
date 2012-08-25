var lz = require('../')
var _ = require('lodash')

var assert = require('assert')

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

var odd = function (n) { return n % 2 !== 0 }

function _lodash() {
  return _.last(_.filter(a, odd))
}

function _lz() {
  return new lz(a).filter(odd).last()
}

assert.deepEqual(_lodash(), _lz())

require('./')({
  'lodash': _lodash,
  'lz': _lz
})

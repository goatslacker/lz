var lz = require('../')
var _ = require('lodash')

var assert = require('assert')

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function _lodash() {
  return _.initial(a)
}

function _lz() {
  return new lz(a).init().$()
}

assert.deepEqual(_lodash(), _lz())

require('./')({
  'lodash': _lodash,
  'lz': _lz
})

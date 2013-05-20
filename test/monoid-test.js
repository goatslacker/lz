var assert = require('assert')
var lz = require('../')

var m = new lz([1, 2, 3])

var z1 = m.concat(m.zero()).toArray()
var z2 = m.zero().concat(m).toArray()

assert.deepEqual(z1, z2)

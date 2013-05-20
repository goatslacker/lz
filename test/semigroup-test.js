var assert = require('assert')
var lz = require('../')

var a = new lz([1, 2, 3])
var b = new lz([4, 5, 6])
var c = new lz([7, 8, 9])

var z1 = a.concat(b).concat(c).toArray()
var z2 = a.concat(b.concat(c)).toArray()

assert.deepEqual(z1, z2)

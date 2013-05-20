var assert = require('assert')
var lz = require('../')

var f = function (x) { return x * 2 }
var g = function (x) { return x - 1 }

var m = new lz([1, 2, 3])

var z1 = m.map(function (x) { return f(g(x)) }).toArray()
var z2 = m.map(g).map(f).toArray()

assert.deepEqual(z1, z2)

var z3 = m.map(function (a) { return a }).toArray()
assert.deepEqual(z3, m.toArray())

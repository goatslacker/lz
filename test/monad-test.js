var assert = require('assert')
var lz = require('../')

var a = [1, 2, 3]

var m = new lz(a)
var f = function (x) { return new lz(x.slice(1)) }
var g = function (x) { return new lz(x[0]) }

var z1 = m.chain(f).chain(g).toArray()
var z2 = m.chain(function (x) {
  return f(x).chain(g)
}).toArray()
assert.deepEqual(z1, z2)

var z3 = m.of(a).chain(f)
var z4 = f(a)
assert.deepEqual(z3, z4)

var z5 = m.chain(m.of)
var z6 = m
assert.deepEqual(z5.toArray(), z6.toArray())

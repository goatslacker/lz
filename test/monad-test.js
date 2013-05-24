module.exports = function (assert, lz) {
  var a = [1, 2, 3]
  var m = new lz(a)
  var f = function (x) { return new lz(x.slice(1)) }
  var g = function (x) { return new lz(x[0]) }

  var eq = assert.deepEqual

  return {
    associativity: function () {
      var z1 = m.chain(f).chain(g).toArray()
      var z2 = m.chain(function (x) {
        return f(x).chain(g)
      }).toArray()

      eq(z1, z2)
    },

    leftIdentity: function () {
      eq(
        m.of(a).chain(f),
        f(a)
      )
    },

    rightIdentity: function () {
      eq(
        m.chain(m.of).toArray(),
        m.toArray()
      )
    }
  }
}

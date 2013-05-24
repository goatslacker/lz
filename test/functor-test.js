module.exports = function (lz, assert) {
  var f = function (x) { return x * 2 }
  var g = function (x) { return x - 1 }

  var m = new lz([1, 2, 3])

  return {
    identity: function () {
      assert.deepEqual(
        m.map(function (a) { return a }).toArray(),
        m.toArray()
      )
    },

    composition: function () {
      assert.deepEqual(
        m.map(function (x) { return f(g(x)) }).toArray(),
        m.map(g).map(f).toArray()
      )
    }
  }
}

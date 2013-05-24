module.exports = function (lz, assert) {
  var a = new lz([1, 2, 3])
  var b = new lz([4, 5, 6])
  var c = new lz([7, 8, 9])

  return {
    associativity: function () {
      assert.deepEqual(
        a.concat(b).concat(c).toArray(),
        a.concat(b.concat(c)).toArray()
      )
    }
  }
}

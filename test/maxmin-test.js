module.exports = {

  max: function (lz, assert, data) {
    assert.equal(
      lz(data.a)
      .max(),
      29
    )
  },

  min: function (lz, assert, data) {
    assert.equal(
      lz(data.a)
      .min(),
      10
    )
  },

  'filter and min': function (lz, assert, data) {
    assert.equal(
      lz(data.a)
      .filter(function (x) { return x > 15 })
      .min(),
      16
    )
  },

  'map and max': function (lz, assert, data) {
    assert.equal(
      lz(data.a)
      .take(3)
      .map(function (n) {
        return n
      })
      .max(),
      12
    )
  }
}

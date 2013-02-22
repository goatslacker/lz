module.exports = {
  map: function (lz, assert, data) {
    assert.equal(
      lz(data.a)
      .map(function (x) { return x * 10 })
      .head(),
      100
    )
  },

  'map and filter': function (lz, assert, data) {
    assert.equal(
      lz(data.a)
      .map(function (x) { return x * 10 })
      .filter(function (x) { return x === 200 })
      .head(),
      200
    )
  }
}

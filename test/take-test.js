module.exports = {
  take: function (lz, assert, data) {
    assert.deepEqual(
      lz(data.a)
      .filter(function (x) {
        return x.toString()[0] === '2'
      })
      .take(5)
      .$(),
      [20, 21, 22, 23, 24]
    )
  },

  'taking more than we can': function (lz, assert, data) {
    assert.deepEqual(
      lz(data.a)
      .filter(function (x) { return x > 28 })
      .take(3)
      .$(),
      [29]
    )
  },

  'taking then reusing': function (lz, assert, data) {
    assert.equal(
      lz(data.a)
      .map(function (n) {
        return n + 10
      })
      .take(10)
      .filter(function (n) {
        return n < 30
      })
      .head(),
      20
    )
  }
}

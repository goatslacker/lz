var a = [1, 2, 3]

module.exports = {
  dropWhile: function (lz, assert, data) {
    assert.deepEqual(
      lz(data.a).dropWhile(function (n) {
        return n < 25
      })
      .$(),
      [25, 26, 27, 28, 29]
    )
  },

  'dropping more than you can': function (lz, assert) {
    assert.deepEqual(
      lz(a)
      .dropWhile(function (n) { return n < 5 })
      .$(),
      []
    )
  },

  'dropping then reusing': function (lz, assert, data) {
    assert.equal(
      lz(data.a)
      .dropWhile(function (n) { return n < 20 })
      .filter(function (n) { return n % 2 === 0 })
      .map(function (n) { return n * 2 })
      .dropWhile(function (n) { return n < 50 })
      .map(function (n) { return n - 50 })
      .last(),
      6
    )
  }
}


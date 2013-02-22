module.exports = {
  replicate: function (lz, assert) {
    assert.deepEqual(
      lz
      .replicate(3, 1)
      .$(),
      [1, 1, 1]
    )
  },

  chained: function (lz, assert) {
    assert.equal(
      lz
      .replicate(2, 3)
      .map(function (n) { return n * 3 })
      .last(),
      9
    )
  }
}

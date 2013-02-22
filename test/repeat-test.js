module.exports = {
  repeat: function (lz, assert) {
    assert.deepEqual(
      lz
      .repeat(1)
      .take(3)
      .$(),
      [1, 1, 1]
    )

    assert.equal(
      lz
      .repeat(2)
      .head(),
      2
    )
  },

  chained: function (lz, assert) {
    assert.equal(
      lz
      .repeat(3)
      .map(function (n) { return n * 3 })
      .take(2)
      .last(),
      9
    )
  }
}

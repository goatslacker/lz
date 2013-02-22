var arr = [1, '', false, 2, null, 3, false, 4, 5, 6, null, 7, 8, null, 9, 10]

module.exports = {
  compact: function (lz, assert) {
    assert.deepEqual(
      lz(arr)
      .compact()
      .take(3)
      .$(),
      [1, 2, 3]
    )
  },

  'compact then map then compact': function (lz, assert) {
    assert.equal(
      lz(arr)
      .compact()
      .map(function (n) { return (n < 9) ? null : n })
      .compact()
      .head(),
      9
    )
  }
}

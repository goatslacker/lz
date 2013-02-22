module.exports = {
  foldl: function (lz, assert) {
    assert.equal(
      lz([1, 2, 3, 4, 5]).foldl(function (a, b) {
        return a + b
      }),
      15
    )
  }
}

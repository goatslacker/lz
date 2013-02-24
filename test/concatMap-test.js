var arr = [1, 2, 3]

module.exports = {
  concatMap: function (lz, assert) {
    assert.deepEqual(
      lz.concatMap(function (n) {
        return [n, n]
      }, arr).toArray(),
      [1, 1, 2, 2, 3, 3]
    )
  }
}

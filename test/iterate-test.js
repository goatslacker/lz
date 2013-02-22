module.exports = {
  iter: function (lz, assert) {
    assert.deepEqual(
      lz
      .iterate(function (n) { return n + 1}, 1)
      .take(5)
      .$(),
      [1, 2, 3, 4, 5]
    )

    assert.deepEqual(
      lz
      .iterate(function (n) { return n + 1}, 1)
      .map(function (n) { return n * 2 })
      .take(5)
      .$(),
      [2, 4, 6, 8, 10]
    )
  }
}

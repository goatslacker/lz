module.exports = {
  concat: function (lz, assert) {
    assert.deepEqual(
      lz([1, 2, 3])
      .concat([4, 5, 6])
      .take(5)
      .$(),
      [1, 2, 3, 4, 5]
    )
  },

  'concat with cycle': function (lz, assert) {
    assert.deepEqual(
      lz([1, 2, 3])
      .concat(lz.cycle([4, 5]))
      .take(9)
      .$(),
      [1, 2, 3, 4, 5, 4, 5, 4, 5]
    )
  }
}


var arr = [1, 2, 3, 4, 5, 6]

module.exports = {

  filter: function (lz, assert, data) {
    assert.equal(
      lz(data.a)
      .filter(function (x) { return x === 20 })
      .head(),
      20
    )
  },

  'filter then map': function (lz, assert) {
    assert.deepEqual(
      lz(arr)
      .filter(function (n) { return n % 2 === 0 })
      .map(function (n) { return n * n })
      .$(),
      [4, 16, 36]
    )
  },

  'filter then map then filter': function (lz, assert) {
    assert.deepEqual(
      lz(arr)
      .filter(function (n) { return n % 2 === 0 })
      .map(function (n) { return n * n })
      .filter(function (n) { return n > 20 })
      .$(),
      [36]
    )
  },

  'filter then map then filter then map': function (lz, assert) {
    assert.deepEqual(
      lz(arr)
      .filter(function (n) { return n % 2 === 0 })
      .map(function (n) { return n * n })
      .filter(function (n) { return n > 10 })
      .map(function (n) { return n / 2 })
      .$(),
      [8, 18]
    )
  },

  'all + take and drop': function (lz, assert) {
    assert.deepEqual(
      lz(arr)
      .filter(function (n) { return n % 2 === 0 })
      .map(function (n) { return n * n })
      .filter(function (n) { return n > 10 })
      .map(function (n) { return n / 2 })
      .take(1)
      .drop(1)
      .$(),
      []
    )
  },

  'takewhile map filter foldl': function (lz, assert) {
    assert.deepEqual(
      lz(arr)
      .takeWhile(function (n) { return n < 5 })
      .map(function (n) { return n * n })
      .filter(function (n) { return n % 2 === 0 })
      .foldl(function (a, b) { return b / a }),
      4
    )
  }

}

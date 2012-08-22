exports.zipWith = function (lz, assert) {
  assert.deepEqual(
    lz.zipWith(
      function (a, b) { return a - b },
      lz([1, 2, 3]),
      lz([3, 2, 1])
    )
    .take(3),
    [-2, 0, 2]
  )

  assert.deepEqual(
    lz.zipWith(
      function (a, b) { return a - b },
      lz([1, 2, 3, 4, 6, 8]),
      lz([3, 2, 1])
    )
    .all(),
    [-2, 0, 2]
  )
}

exports.fastZipWith = function (lz, assert) {
  assert.equal(
    lz.zipWith(
      function (a, b) { return a - b },
      [1, 2, 3],
      [3, 2, 1]
    )
    .head(),
    -2
  )

  assert.deepEqual(
    lz.zipWith(
      function (a, b) { return a - b },
      [1, 2, 3, 4, 6, 8],
      [3, 2, 1]
    )
    .take(3),
    [-2, 0, 2]
  )

  assert.deepEqual(
    lz.zipWith(
      function (a, b) { return a - b },
      [1, 2, 3],
      [3, 2, 1]
    )
    .all(),
    [-2, 0, 2]
  )

  assert.deepEqual(
    lz.zipWith(
      function (a, b) { return a - b },
      [1, 2, 3, 4, 6, 8],
      [3, 2, 1]
    )
    .take(40),
    [-2, 0, 2]
  )
}

exports.proto = function (lz, assert) {
  assert.equal(
    lz([1])
    .zipWith(
      function (a, b) { return a + b },
      [2]
    )
    .head(),
    3
  )
}

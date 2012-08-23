exports.drop = function (lz, assert) {
  return false

  assert.deepEqual(
    [1, 2, 3].lz().drop(2),
    [3]
  )

  assert.deepEqual(
    [1, 2, 3].lz().drop(2).lz().head(),
    3
  )

  assert.deepEqual(
    [1, 2, 3, 4, 5, 6].lz()
    .filter(function (n) {
      return n % 2 === 0
    })
    .drop(2),
    [6]
  )
}
